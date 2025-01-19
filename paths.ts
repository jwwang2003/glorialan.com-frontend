import { getBaseHostname } from "@/_lib/environment";
import { ROLES } from "./globalStates"

export const PROTECTED_ROUTES = {
  '/admin': [0],                    // Only admin
  '/dashboard': [0, 1],        // Admin or user
};

interface PathType {
  path: string;
  name: string;
  hidden?: boolean;
  protection?: ROLES[];
  children?: PathType[];
}

export const definedPaths: PathType = {
  path: "/",
  name: "Home",
  children: [
    {
      path: "/art",
      name: "Art",
    },
    {
      name: "Photo",
      path: "/photo",
    },
    {
      name: "ShanXi",
      path: "/shanxi",
    },
    {
      name: "FeiYi",
      path: "/feiyi",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "Dasboard",
      path: "/dashboard",
      hidden: true,
      protection: [ROLES.ADMIN],
      children: [
        {
          path: "/profile",
          name: "Profile"
        },
        {
          path: "/database",
          name: "Database"
        },
        {
          path: "/s3",
          name: "AWS S3"
        },
        {
          path: "/ingest",
          name: "Ingest"
        },
      ]
    }
  ],
};

export function findLongestProtectedMatch(
  node: PathType,
  currentPath: string
): PathType | null {
  let candidate: PathType | null = null;

  function dfs(currentNode: PathType) {
    // Only consider nodes that define "protection"
    if (currentNode.protection && currentPath.startsWith(currentNode.path)) {
      // If we don't have a candidate yet, or this node's path is longer, replace it
      if (!candidate || currentNode.path.length > candidate.path.length) {
        candidate = currentNode;
      }
    }
    // Continue searching children
    if (currentNode.children) {
      for (const child of currentNode.children) {
        dfs(child);
      }
    }
  }

  dfs(node);
  return candidate;
}

/**
 * Recursively searches for a node in the PathType tree
 * whose .path matches the targetPath exactly.
 */
function findNodeByPath(root: PathType, targetPath: string): PathType | null {
  // If the current node matches the path, return it immediately
  if (root.path === targetPath) {
    return root;
  }

  // Otherwise, search children (if any)
  if (root.children) {
    for (const child of root.children) {
      const found = findNodeByPath(child, targetPath);
      if (found) {
        return found;
      }
    }
  }

  // If not found, return null
  return null;
}

function ensureTrailingSlash(urlString: string): string {
  return urlString.endsWith("/") ? urlString : urlString + "/";
}

function cleanChildPathForURL(childPath: string): string {
  // Remove leading slashes if any
  return childPath.replace(/^\/+/, "");
}

/**
 * Recursively gather paths from a given node up to 'maxDepth' levels.
 * - currentDepth starts at 1 for the node itself
 * - If currentDepth < maxDepth, we also gather the children's paths.
 */
function gatherPathsWithDepth(
  node: PathType,
  baseURL: string,
  currentDepth: number,
  maxDepth: number
): PathType[] {
  // 1) Build this node's full URL using new URL()
  //    Note: if node.path is absolute (like "/dashboard"), we remove leading slash
  //          so new URL() will append it to baseURL properly.
  const childSegment = cleanChildPathForURL(node.path);
  const nodeURL = new URL(childSegment, ensureTrailingSlash(baseURL));

  // 2) Build the PathItem for this node
  const pathItem: PathType = {
    path: nodeURL.pathname, // e.g., "/dashboard/profile"
    name: node.name,
    hidden: node.hidden,
    protection: node.protection,
  };

  // 3) If we haven't reached maxDepth, gather children
  const results: PathType[] = [pathItem];
  if (node.children && currentDepth <= maxDepth) {
    for (const child of node.children) {
      if (child.hidden) continue;
      results.push(
        ...gatherPathsWithDepth(
          child,
          nodeURL.toString(), // pass the full URL as the new base
          currentDepth + 1,
          maxDepth
        )
      );
    }
  }

  return results;
}

/**
 * Returns an array of paths starting from the node whose path = startPath,
 * going up to 'maxDepth' levels deep.
 *
 * - Depth = 1 => node's path + direct children only
 * - Depth = 2 => includes grandchildren, etc.
 *
 * @param root The root of your PathType tree (e.g. definedPaths)
 * @param startPath The path where we want to begin (e.g. "/dashboard")
 * @param maxDepth The desired depth, defaulting to 1
 *
 * @example
 *   getPossiblePathsFrom(definedPaths, "/", 1)
 *     => ["/", "/art", "/photo", "/shanxi", "/feiyi", "/about", "/shop", "/dashboard"]
 *
 * @example
 *   getPossiblePathsFrom(definedPaths, "/dashboard", 2)
 *     => ["/dashboard", "/dashboard/profile", "/dashboard/database", "/dashboard/injest"]
 *        (If those children had children, they'd appear too at Depth=2)
 */
export function getPossiblePathsFrom(
  root: PathType,
  startPath: string,
  maxDepth = 1
): PathType[] {
  // 1) Locate the starting node
  const startNode = findNodeByPath(root, startPath);

  if (!startNode) {
    return [];
  }

  // 2) Gather paths from this node, default base = "http://localhost/"
  const results = gatherPathsWithDepth(
    startNode,
    getBaseHostname(), // or another domain/URL if you prefer
    1,
    maxDepth
  );

  return results;
}
// export function getPossiblePathsFrom(
//   root: PathType,
//   startPath: string,
//   maxDepth = 1
// ): string[] {
//   const startNode = findNodeByPath(root, startPath);

//   // If we can't find the node, return an empty array
//   if (!startNode) {
//     return [];
//   }

//   // Gather paths from the found node
//   return gatherPaths(startNode, startNode.path, 1, maxDepth);
// }

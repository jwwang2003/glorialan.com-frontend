// This file contains states & enums that should be kept in sync with the backend!

export enum ROLES {
  ADMIN,      // Admin has no route restriction what so ever
  GUESTS,     // Gusts can only view public pages and other pages on spcial occasions
  VISITOR,    // Visitors can only view public pages
  PREVIEW
}
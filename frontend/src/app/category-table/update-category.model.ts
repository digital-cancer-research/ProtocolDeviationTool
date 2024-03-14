export interface UpdateCategoryDTO {
  entryId: number;
  siteId: string;
  studyId: string;
  dvspondesValue: string;
  categoryIds: number[];
  dvterms: string[];
  oldDvterms: string[];
  dvdecods: string[];
  dvcats: string[];
  username: string;
  isEdited: boolean;
}

export class SideNavItem {
  //redirect url
  url?: string;
  //field name/id in html
  name?: string;
  //i18n string name
  label: string;
  //description
  desc?: string;
  //
  window?:boolean;
  children?: SideNavItem[];
}
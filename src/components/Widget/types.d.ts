type ObjType = {
  [key: string]: string;
  widgetType: 'activeStatus' | 'tps' | 'informatics' | 'todayUsers' | 'simultaneousUser';
};

interface IInformation {
  title: string;
  description: string[];
}

interface IInformButtonPosition {
  x: number;
  y: number;
}

export { ObjType, IInformation, IInformButtonPosition };

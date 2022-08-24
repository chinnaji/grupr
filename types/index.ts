export interface TModalProps {
  setIsModal: (isModal: boolean) => void;
  children: JSX.Element;
  // isModal: boolean;
}

export interface TLayoutProps {
  title: string;
  url: string;
  image: any;
}
// export interface TgetShortenDataProps {
//   destinations?: Array<string>;
//   setGrupUrl: (grupUrl: string) => void;
//   setIsModal: (isModal: boolean) => void;
//   title: string;
//   createdBy: string;
//   setIsLoading: (isLoading: boolean) => void;
// }

// export interface TsubmitProps extends TgetShortenDataProps {
//   isExcel: boolean;
//   textArealinks: string;
//   excelFile: any;
//   // e: any;
//   createdBy: string;
// }

export interface TsignUserData {
  email: string;
  name: string;
  uid: string;
  res: any;
}

interface Tdestinations {
  destinations: Array<string>;
}
interface TuserGrups {
  grupId: string;
  fullUrl: string;
  title: string;
  createdBy: string;
  destinations: Tdestinations;
  dateCreated: string;
}
export interface TdashboardProps {
  userData: {
    // grups: Array<any>;
    name: string;
    email: string;
    userGrups: Array<TuserGrups>;
  };
}

export interface TcopyToClipboardProps {
  text: string;
  type: 1 | 2;
}

export interface saveGruprProps {
  urls: Array<string>;
  title: string;
  createdBy: string;
}
export interface dashboardListProps {
  data: {
    dateCreated: string;
    fullUrl: string;
    grupId: string;
    title: string;
  };
}
export interface loadingButtonProps {
  isLoading: boolean;
  text: string;
}

export interface UploadExcelProps {
  excelFile: any;
  setExcelFile: (file: File) => void;
}

export interface grupDataProps {
  dateCreated: string;
  createdBy: string;
  destinations: string[];
  title: string;
  grupId: string;
  fullUrl: string;
}

export interface destinationsMetadataProps {
  url: string;
  title: string;
  favicon: any;
  image: string[];
  description: string;
}

export interface grupIdProps {
  grupData: grupDataProps;
  destinationsMetadata: destinationsMetadataProps[];
}

export interface alertDialog {
  type: 'success' | 'danger' | 'warning' | 'failed';
  showLogo?: boolean;
  header: string;
  message: string;
  btnText: string;
}

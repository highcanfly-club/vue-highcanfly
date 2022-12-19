 type MountOptions = {
  checkoutId: string;
  showSubmitButton?: boolean;
  showFooter?: boolean;
  showInstallments?: boolean;
  showZipCode?: boolean;
  showEmail?: boolean;
  email?: string;
  installments?: number;
  id?: string;
  donateSubmitButton?: boolean;
  amount?: string;
  locale?: import("./api").SumupLocale;
  currency?: import("./api").SumupCurrency;
  country?: import("./api").SumupCountry;
  onResponse?: (type: any, body: any) => void;
  onLoad?: () => void;
  onChangeInstallments?: (installments: number) => void;
};

 type UpdateOptions = {
  checkoutId?: any;
  email?: any;
  amount?: any;
  currency?: any;
  installments?: any;
};

 declare type SumUpWidget = {
  submit(): void;
  unmount(): void;
  update(options: UpdateOptions): void;
};

declare namespace SumUpCard {
  function mount(options: MountOptions): SumUpWidget;
}
import {Injectable} from '@angular/core';
import {HotToastService} from "@ngneat/hot-toast";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toast: HotToastService) {
  }

  showNotification(message: string, type: string): void {
    if (type === 'success') {
      this.toast.success(message, this.toastConfig());
    } else if (type === 'warning') {
      this.toast.warning(message, this.toastConfig());
    } else if (type === 'error') {
      this.toast.error(message, this.toastConfig());
    } else if (type === 'loading') {
      this.toast.loading(message)
    } else if (type === 'show') {
      this.toast.show(message, this.toastConfig())
    } else {
      this.toast.info(message, this.toastConfig())
    }
  }

  toastConfig() {
    return {
      duration: 1500,
      style: {
        padding: '16px',
      },
      // iconTheme: {
      //   primary: '#713200',
      //   secondary: '#FFFAEE',
      // }
    }
  }
}

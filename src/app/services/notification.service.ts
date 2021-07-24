import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }


  showSuccess(message: string, timeOut: number)
  {
    this.toastr.success(message, '', {
      timeOut: timeOut
    });
  }

  showDelete(message: string, timeOut: number) {
    this.toastr.error(message, '', {
      timeOut: timeOut
    });
  }

  showInfo(message: string, timeOut: number) {
    this.toastr.info(message, '', {
      timeOut: timeOut
    });
  }
}

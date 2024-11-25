import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  // timer: 3000,
  timerProgressBar: true,
});

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  SwalSuccess(title: string, message = '', duration: number = 2000) {
    Swal.fire(
      {
        icon: 'success',
        title: title,
        text: message,
        timer: duration,
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false
      });
  }

  SwalInfoWithCustomHtml(title: string, showConfirmButton: boolean, valoresIterables: any[]) {
    Swal.fire(
      {
        icon: 'info',
        title: title,
        html: `<ul><li *ngFor="let item of ${valoresIterables}">{{item}}</li></ul>`,
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: showConfirmButton
      });
  }

  SwalInfo(title: string, message: string = '', showConfirmButton: boolean) {
    if (showConfirmButton) {
      Swal.fire(
        {
          icon: 'info',
          title: title,
          text: message,
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: showConfirmButton
        });
    } else if (!showConfirmButton) {
      Swal.fire(
        {
          icon: 'info',
          title: title,
          text: message,
          timer: 2500,
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: showConfirmButton
        });
    }
  }

  SwalError(title: string, message: string) {
    Swal.fire(
      {
        icon: 'error',
        title: title,
        text: message,
        showConfirmButton: true,
        confirmButtonText: `OK`,
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
      });
  }

  SwalQuestion(title: string, message = '', functionToDo: any) {
    Swal.fire(
      {
        icon: 'question',
        title: title,
        text: message,
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: `OK`,
        showClass: {
          popup: 'animated fadeInDown'
        },
        hideClass: {
          popup: 'animated fadeOutUp'
        }
      }).then(result => {
        if (result.isConfirmed) {
          this.SwalLoading('Procesando Solicitud');
          functionToDo();
        }

        else if (result.isDenied) {
          this.SwalInfo('Se ha cancelado la solicitud', '', false);
        }
      });
  }

  SwalQuestion3(title: string, message = '', functionToDo: any, functionToDoDenied: any) {
    Swal.fire(
      {
        icon: 'question',
        title: title,
        text: message,
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: `OK`,
        showClass: {
          popup: 'animated fadeInDown'
        },
        hideClass: {
          popup: 'animated fadeOutUp'
        }
      }).then(result => {
        if (result.isConfirmed) {
          this.SwalLoading('Procesando Solicitud');
          functionToDo();
        }

        else if (result.isDenied) {
          this.SwalInfo('Se ha cancelado la solicitud', '', false);
          functionToDoDenied();
        }
      });
  }


  question(html: string, title?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title, html, icon: 'question', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si', cancelButtonText: 'No'
    });
  }

  SwalQuestion2(title: string, message = '') {

    return new Promise<void>((resolve, reject) => {
      Swal.fire(
        {
          icon: 'question',
          title: title,
          text: message,
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          showDenyButton: true,
          showConfirmButton: true,
          confirmButtonText: `Sí`,
          showClass: {
            popup: 'animated fadeInDown'
          },
          hideClass: {
            popup: 'animated fadeOutUp'
          }
        }).then(result => {
          if (result.isConfirmed) {
            // this.SwalLoading('Procesando Solicitud');
            resolve();
          }

          else if (result.isDenied) {
            this.SwalInfo('Se ha cancelado el proceso', '', false);
            reject();
          }
        });

    });
  }


  SwalWarning(title: string = '', message: string = '', duration: number = 1500) {
    Swal.fire(
      {
        icon: 'warning',
        title: title,
        text: message,
        // timer: duration,
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonColor: "#008000"
      });
  }

  SwalLoading(title: string = 'Cargando...', message: string = 'Espere un momento, por favor', showCloseButtonAfter: number = 60000) {
    Swal.fire({
      title: title,
      text: message,
      showCloseButton: true,      
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading(Swal.getConfirmButton());
      }
    });

    const closeButton:any = document.getElementsByClassName("swal2-close")[0]
    closeButton.style["visibility"] = "hidden";
    setTimeout(() => {
      closeButton.style["visibility"] = "visible";
    }, showCloseButtonAfter);
  }

  SwalClose() {
    Swal.close();
  }

  SwalToast(title: string, duration: number = 2000) {
    Swal.fire({
      title: title,
      toast: true,
      position: 'center',
      timer: duration
    });
  }

  SwalShowHttpMessage(error: any) {
    let message: string = ''
    try {
      message = error.error.message.toString()
    } catch (error) {
    }
    if (message == '') {
      this.SwalSinConexionAlServidor();
      return;
    }

    this.SwalCustom('warning', 'Solicitud incorrecta',
      `<div style="text-align: justify"><p>${message}</p></div>`);
    // this.SwalWarning(message);
  }

  SwalSinConexionAlServidor() {
    const title = 'Sin conexión al servidor';
    const message = 'No se ha podido establecer conexión con el servidor. Por favor, intente nuevamente o póngase en contacto con el soporte técnico.';
    this.SwalError(title, message)
  }

  SwalCustom(type: 'success' | 'warning' | 'error' | 'info' | 'question', title: string = '', html = ''): void {
    Swal.fire({
      icon: type,
      title: title,
      html: html,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
  }

  swalBrowserPermission(title: string, message: string = "", img: string) {
    Swal.fire({
      title: title,
      text: message,
      imageUrl: ``,
      imageWidth: 400,
      imageHeight: 200,
      confirmButtonText: 'Ok, entendido.',
      showConfirmButton: true,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then(() => {
      localStorage.setItem('alertShownBefore', JSON.stringify(true))
    });
  }

  Toast(title: string, type: 'success' | 'warning' | 'error' | 'info' | 'question', time: number = 3000) {
    Toast.fire({
      icon: type,
      title: title,
      timer: time
    });    
  }
  
}

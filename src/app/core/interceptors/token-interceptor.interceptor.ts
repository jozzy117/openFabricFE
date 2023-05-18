import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private excludedRoutes: { url: string, methods: string[] }[] = [
    { url: 'login', methods: ['POST'] },
    { url: 'products', methods: ['GET'] }
  ];

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinner.show();
    if (this.isExcludedRoute(request.url, request.method)) {
      return next.handle(request).pipe(
        finalize(()=> this.spinner.hide())
      );
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODQzNTM0Mjl9.lF0RcPOTPREoPpAozLtl15ZvGMUvfJsCY8JEX0YdJU4';

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: token
      }
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      finalize(() => this.spinner.hide())
    );
  }
  
  private handleError = (error: HttpErrorResponse): Observable<never> => {
    if (error.status === 401) {
      this.toastr.error('Unauthorized', 'Error');
    } else if (error.status === 403) {
      this.toastr.error('Forbidden', 'Error');
    } else {
      this.toastr.error('An error occurred', 'Error');
    }

    return throwError(error);
  };

  private isExcludedRoute(url: string, method: string): boolean {
    const excludedRoute = this.excludedRoutes.find(route => route.url === url && route.methods.includes(method));
    return !!excludedRoute;
  }
}

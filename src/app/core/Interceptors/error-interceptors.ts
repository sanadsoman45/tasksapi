import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, throwError, finalize } from "rxjs";
import { LoaderService } from "../Services/loaderService";

export const appHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const toastr = inject(ToastrService);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.error?.message || error.message || 'Unexpected error occurred';
      toastr.error(message, `Error ${error.status}`);
      return throwError(() => error);
    }),
  );
};

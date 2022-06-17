import {Component, Type} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from "../../../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmdelete',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Account deletion</h4>
    <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"{{this.accountService.getUsername()}}"</span> account?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click'); this.deleteAccount();">Ok</button>
  </div>
  `
})

export class ConfirmdeleteComponent {

  public btncolor: string = "green";

  constructor(public modal: NgbActiveModal,
              protected accountService: AccountService,
              private router: Router) {}


  deleteAccount() {
    this.accountService.delete();
    this.router.navigate(['/']);
  }
}


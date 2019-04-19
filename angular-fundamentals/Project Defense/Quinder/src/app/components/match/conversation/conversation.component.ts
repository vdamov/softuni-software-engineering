import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from '../../../core/services/message.service';
import {IMessage} from '../../shared/interfaces/message.interface';
import {IUser} from '../../shared/interfaces/user.interface';
import {UserService} from '../../../core/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public messageForm: FormGroup;
  public allMessages: IMessage[];
  private userId: string;
  private matchId: string;
  private user: IUser;
  private partner: IUser;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.userId = localStorage.getItem('userId');
    this.messageForm = fb.group({
      content: [null]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.matchId = params.id;
      this.getAllMessages();
    });
    this.subscription.add(this.userService.getUserById(this.userId).subscribe((user) => this.user = user));
    this.getAllMessages();
    this.subscription.add(this.messageService.refreshNeeded$.subscribe(() => {
      this.getAllMessages();
    }));

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  getAllMessages() {
    this.subscription.add(this.userService.getUserById(this.route.snapshot.paramMap.get('partnerId')).subscribe((partner) => this.partner = partner));
    this.subscription.add(this.messageService.getAllMessages(this.matchId).subscribe((messages: IMessage[]) => {
      this.allMessages = messages;
    }));
  }

  addMessage() {
    const content = this.messageForm.get('content').value;
    this.subscription.add(this.messageService.postMessage(this.matchId, this.userId, content).subscribe(() => {
      this.messageForm.reset();
    }));
  }

  deleteMessage(messageId: string) {
    this.subscription.add(this.messageService.deleteMessage(messageId).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

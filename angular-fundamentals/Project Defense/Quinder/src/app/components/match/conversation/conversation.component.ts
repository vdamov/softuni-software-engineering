import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageService} from '../../../core/services/message.service';
import {IMessage} from '../../shared/interfaces/message.interface';
import {IUser} from '../../shared/interfaces/user.interface';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private messageForm: FormGroup;
  private readonly matchId: string;
  private userId: string;
  private allMessages: IMessage[];
  private user: IUser;
  private partner: IUser;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.matchId = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId');

    this.userService.getUserById(this.route.snapshot.paramMap.get('partnerId')).subscribe((partner) => this.partner = partner);
    this.userService.getUserById(this.userId).subscribe((user) => this.user = user);

    this.messageForm = fb.group({
      content: [null]
    });
  }

  ngOnInit() {
    this.getAllMessages();
    this.messageService.refreshNeeded$.subscribe(() => {
      this.getAllMessages();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  getAllMessages() {
    this.messageService.getAllMessages(this.matchId).subscribe((messages: IMessage[]) => {
      this.allMessages = messages;
    });
  }

  addMessage() {
    const content = this.messageForm.get('content').value;
    this.messageService.postMessage(this.matchId, this.userId, content).subscribe(() => {
      this.messageForm.reset();
    });
  }

  deleteMessage(messageId: string) {
    this.messageService.deleteMessage(messageId).subscribe();
  }
}

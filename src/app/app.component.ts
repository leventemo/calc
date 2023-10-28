import { Component } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/hu';
import { Utils } from './utils';
registerLocaleData(localeFr, 'hu');

interface Expenses {
  perMonth: number;
  perYear: number;
  untilNow: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = 'calc';
  soldFor: number = 18000000;
  agentsFee: number = 600000;
  sumAfterAgent: number = 0o0;

  startingDate: Date = new Date('2021-09-01');
  dateNow: Date = new Date();
  elapsedTimeInMonths: number = 0o0;

  community: Expenses = {
    perMonth: 7000,
    perYear: 7000 * 12,
    untilNow: 0o0,
  }

  insurance: Expenses = {
    perMonth: 2000,
    perYear: 2000 * 12,
    untilNow: 0o0,
  }

  gasAndWater: Expenses = {
    perMonth: 5000,
    perYear: 5000 * 12,
    untilNow: 0o0,
  }

  allExp: Expenses = {
    perMonth: this.community.perMonth + this.insurance.perMonth + this.gasAndWater.perMonth,
    perYear: 0o0,
    untilNow: 0o0,
  }

  sumAfterExpenses: number = 0o0;
  sumPerPerson: number = 0o0;
  taxPerParts: number = 0o0;
  sumPerPersonAfterTax: number = 0O0;

  gift: number = 0o0;
  taxOnGift: number = 0o0;
  giftAfterTax: number = 0o0;
  arrow: any;

  onChangeSoldFor(event: Event) {
    const target = event.target as HTMLInputElement;
    const parsedValue = parseInt(target.value);

    if (!isNaN(parsedValue)) {
      this.soldFor = parsedValue;
    }
    this.setValuesToZero();
  }

  onChangeAgentsFee(event: Event) {
    const target = event.target as HTMLInputElement;
    const parsedValue = parseInt(target.value);

    if (!isNaN(parsedValue)) {
      this.agentsFee = parsedValue;
    }
    this.setValuesToZero();
  }

  calculate(event: Event) {
    const target = event.target as HTMLInputElement;
    setTimeout(() => {
      target.blur();
    }, 1000);

    this.sumAfterAgent = this.soldFor - this.agentsFee

    this.dateNow = new Date();
    this.elapsedTimeInMonths = Utils.getElapsedMonths(this.startingDate, this.dateNow);

    this.community.untilNow = this.community.perMonth * this.elapsedTimeInMonths;
    this.insurance.untilNow = this.insurance.perMonth * this.elapsedTimeInMonths;
    this.gasAndWater.untilNow = this.gasAndWater.perMonth * this.elapsedTimeInMonths;
    this.allExp.untilNow = this.allExp.perMonth * this.elapsedTimeInMonths;

    this.sumAfterExpenses = this.sumAfterAgent - this.allExp.untilNow;
    this.sumPerPerson = this.sumAfterExpenses / 6;
    this.taxPerParts = this.sumPerPerson * 0.15;
    this.sumPerPersonAfterTax = this.sumPerPerson - this.taxPerParts
    this.gift = this.sumPerPersonAfterTax / 4;
    this.taxOnGift = this.gift * 0.09;
    this.giftAfterTax = this.gift - this.taxOnGift;

  }

  setValuesToZero() {
    this.community.untilNow = 0o0;
    this.insurance.untilNow = 0o0;
    this.gasAndWater.untilNow = 0o0;
    this.allExp.untilNow = 0o0;

    this.sumAfterExpenses = 0o0;
    this.sumPerPerson = this.sumAfterExpenses / 6;
    this.taxPerParts = this.sumPerPerson * 0.15;
    this.sumPerPersonAfterTax = this.sumPerPerson - this.taxPerParts
    this.gift = this.sumPerPersonAfterTax / 4;
    this.taxOnGift = this.gift * 0.09;
    this.giftAfterTax = this.gift - this.taxOnGift;
  }

}

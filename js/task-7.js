// Напиши скрипт управления личным кабинетом интернет банка.
// Есть объект account в котором необходимо реализовать методы для работы с балансом и историей транзакций.

/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */

"use strict";

console.log("TASK - 7");

const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw"
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций

  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    const transaction = {};
    transaction.id = this.transactions.length + 1;
    transaction.type = type;
    transaction.amount = amount;
    return transaction;
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    this.balance += amount;
    this.transactions.push(this.createTransaction(amount, Transaction.DEPOSIT));
    console.log(`Средства (${amount}) успешно внесены на счет!`);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (this.balance < amount) {
      return console.log(
        `Недостаточно средств! На Вашем счету ${this.balance}.`
      );
    }
    this.balance -= amount;
    this.transactions.push(
      this.createTransaction(amount, Transaction.WITHDRAW)
    );
    console.log(`Средства (${amount}) успешно сняты со счета!`);
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    console.log(`Текущий баланс составляет: ${this.balance}`);
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    for (const item of this.transactions) {
      if (item.id === id) {
        console.log(item);
      }
    }
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let total = 0;
    for (const item of this.transactions) {
      if (item.type === type) {
        total += item.amount;
      }
    }
    return console.log(
      `Общая сумма ${
        type === Transaction.DEPOSIT ? "внесенных" : "снятых"
      } средств: ${total}`
    );
  },

  viewTransactionsHist() {
    if (this.transactions.length === 0) {
      console.log("Успешных транзакций нет.");
    } else {
      console.table(this.transactions);
    }
  }
};

account.getBalance();
account.viewTransactionsHist();
account.deposit(150);
account.withdraw(200);
account.deposit(150);
account.withdraw(50);
account.getBalance();
account.withdraw(250);
account.getTransactionTotal(Transaction.DEPOSIT);
account.getTransactionTotal(Transaction.WITHDRAW);
account.viewTransactionsHist();
account.getBalance();

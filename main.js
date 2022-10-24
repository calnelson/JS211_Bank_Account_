class BankAccount {
    constructor (accountNumber, owner){
            this.accountNumber = accountNumber;
            this.owner = owner;
            this.transactions =[]; 
    }

    balance() {
      let sum = 0;
      
      for (let i = 0; i < this.transactions.length; i++) {
        sum += this.transactions[i].amount
      }   
      return sum
      };

    charge(payee, amt){
      let currentBalance =this.balance();
      console.log("CheckOne: " + currentBalance)
      if(amt <= currentBalance) {
      
        
      let chargeTransaction = new Transaction(-1*amt, payee);
      this.transactions.push(chargeTransaction);
      }

      else {
        console.log('it was an else')
        //do nothing
      }
    };

    deposit(amt){
      if(amt>0){
      let depositTransaction = new Transaction(amt, 'Deposit');
      this.transactions.push(depositTransaction);
      }
    };
}


class Transaction {
  constructor(amount, payee) {
    this.amount = amount;
    this.payee = payee;
    this.date = new Date();
  }
}

if (typeof describe === 'function'){
    describe('#testing account creation', function(){
      it('should create a new account correctly', function(){
        
        const acct1 = new BankAccount('xx4432', 'James Doe');
        assert.equal(acct1.owner, 'James Doe');
        assert.equal(acct1.accountNumber, 'xx4432');
        assert.equal(acct1.transactions.length, 0);
        assert.equal(acct1.balance(), 0);

      });
    });

    describe('#testing account balance', function(){
      it('should add account balance', function(){
        
        const acct1 = new BankAccount('xx4432', 'James Doe');
          console.log(acct1.balance());
        assert.equal(acct1.balance(), 0);
        acct1.deposit(100);
           console.log(acct1.balance());
        assert.equal(acct1.balance(),100);

        acct1.charge("Target", 10);
        assert.equal(acct1.balance(), 90);
          console.log(acct1.balance());


      });
      it('should not allow a negative deposit', function(){
        
        const acct1 = new BankAccount('xx4432', 'James Doe');
        assert.equal(acct1.balance(), 0);
        acct1.deposit(100);
        assert.equal(acct1.balance(),100);
        acct1.deposit(-30);
        assert.equal(acct1.balance(), 100);

      });

      it('should not allow charging to overdraft', function(){
        
        const acct1 = new BankAccount('xx4432', 'James Doe');
        assert.equal(acct1.balance(), 0);
        acct1.charge('target', 30);
        assert.equal(acct1.balance(),0);
    
      });

      it('should allow a refund', function(){
        
        const acct1 = new BankAccount('xx4432', 'James Doe');
        assert.equal(acct1.balance(), 0);
        acct1.charge('target', -30);
        assert.equal(acct1.balance(),30);
    
      });
    });

    describe('#testing transaction creation', function(){
      it('should create a transaction correctly', function(){
        let transaction1 = new Transaction(30, 'Deposit' );
        assert.equal(transaction1.amount, 30);
        assert.equal(transaction1.payee, 'Deposit');
        assert.notEqual(transaction1.date, undefined);
        assert.notEqual(transaction1.date, null);
      });
  
      it('should create a transaction correctly for a charge', function(){
        let transaction1 = new Transaction(-34, 'Target');
            assert.equal(transaction1.amount, -34);
        assert.equal(transaction1.payee, "Target");
        assert.notEqual(transaction1.date, undefined);
        assert.notEqual(transaction1.date, null);
  

    });
  });
  describe('Savings Account Creation', function(){
    it('create account correctly', function(){
      let saving = new SavingsAccount("xxx1234", 'Maddie Mortis', .10 );
      assert.equal("xxx1234", saving.accountNumber);
      assert.equal("Maddie Mortis", saving.owner);
      assert.equal(.10, saving.interestRate);
      assert.equal(0, saving.balance());
    });

    it('Accrue interest correctly', function(){
      let saving = new SavingsAccount("xxx1234", 'Maddie Mortis', .10 );
      assert.equal("xxx1234", saving.accountNumber);
      assert.equal("Maddie Mortis", saving.owner);
      assert.equal(.10, saving.interestRate);
      assert.equal(0, saving.balance());
      saving.deposit(100);
      saving.accrueInterest();
      assert.equal(110, saving.balance());
    });
}); 
};
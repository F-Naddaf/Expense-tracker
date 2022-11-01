# Expense Tracker app

## 1. Description

This app help you tracking your expanses.</br>

1- To whom you are going to pay.</br>
2- The date of payment.</br>
3- The amount you have to pay.</br>
4- Able to see the total amount.

## 2. Link and Preview

![App view](./public/img/Image.jpg)
Project link is available at [Expense Tracker App](https://pro-expense-tracker.herokuapp.com/login)
Expenses tracker aan application that requires the user to sign in to save all expenses to reach from anywhere. Users can track and filter expenses and income. Users can also manage debts or loans that need to be paid.

## 3. App Folder Structure

```text
controllers
└── expense.js
database
└── connect.js
models
└── expense.js
└── user.js
public
└── css
  └── expense.css
  └── login.css
  └── register.css
  └── about.css
└── img
  └── Dollars.png
  └── Expense-logo-1.png
  └── Expense-logo.png
  └── Image.png
  └── Wallet-back.png
  └── Wallet-front.png
└── pages
  └── about.js
  └── delete-edit-Expense.js
  └── expense-view.js
  └── expensePage.js
  └── expenseRow.js
  └── findExpense.js
  └── login.js
  └── popup.js
  └── register.js
  └── verifyToken.js
routers
└── auth.js
└── tasks.js
└── validation.js
views
└── about.pug
└── expense.pug
└── login.pug
└── register.pug
app.js
README.md
```

## The app must have

- [x] Nice logo.
- [x] LogIn page.
- [x] SignUp page.
- [x] Expense page.
- [x] About page.
- [x] User can search for the payment entity.
- [x] User can adding a new payment entity to his list.
- [x] User can edit and delete a payment row from his list.
- [x] User can check the total of all his expense.
- [x] Protect the app route if the user not signedIn.
- [x] Automatic logOut when the user leaves the expense page for 5 seconds.
- [x] The background will change if the validity date of the payment according to the color.

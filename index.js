const getStoredData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setStoredData = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

// Add transaction
function addTransaction({ description, amount, type, category, date }) {
  const transactions = getStoredData("transactions");
  transactions.push({ description, amount, type, category, date });
  setStoredData("transactions", transactions);
  renderTransactions();
  updateDashboardSummary();
}

// Render transactions
function renderTransactions() {
  const transactions = getStoredData("transactions");

  // Dashboard rtransaction
  const list = document.getElementById("transaction-list");
  if (list) {
    list.innerHTML = "";
    transactions
      .slice()
      .reverse()
      .forEach((tx) => {
        const li = document.createElement("li");
        li.className = "flex justify-between border-b py-2";
        li.innerHTML = `
        <span>${tx.description}</span>
        <span class="font-semibold ${
          tx.type === "income" ? "text-green-600" : "text-red-600"
        }">
          $${tx.amount.toFixed(2)}
        </span>
      `;
        list.appendChild(li);
      });
  }

  // Transactions table
  const tableBody = document.getElementById("transactions-table-body");
  if (tableBody) {
    tableBody.innerHTML = "";
    transactions.forEach((tx) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-6 py-4">${tx.description}</td>
        <td class="px-6 py-4">$${tx.amount.toFixed(2)}</td>
        <td class="px-6 py-4">${tx.type}</td>
        <td class="px-6 py-4">${new Date(tx.date).toLocaleDateString()}</td>
      `;
      tableBody.appendChild(row);
    });
  }
}

// Update summary cards
function updateDashboardSummary() {
  const transactions = getStoredData("transactions");
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const remaining = totalIncome - totalExpenses;

  const incomeEl = document.getElementById("total-income");
  const expensesEl = document.getElementById("total-expenses");
  const remainingEl = document.getElementById("remaining-budget");

  if (incomeEl) incomeEl.textContent = `$${totalIncome.toFixed(2)}`;
  if (expensesEl) expensesEl.textContent = `$${totalExpenses.toFixed(2)}`;
  if (remainingEl) remainingEl.textContent = `$${remaining.toFixed(2)}`;
}

// Show/hide category dropdown on transaction
function toggleCategoryDropdown() {
  const type = document.getElementById("type")?.value;
  const category = document.getElementById("category");
  if (!category) return;
  if (type === "expense") {
    category.classList.remove("hidden");
  } else {
    category.classList.add("hidden");
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  const transactionForm = document.getElementById("transaction-form");
  if (transactionForm) {
    transactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const description = document.getElementById("description").value.trim();
      const amount = parseFloat(document.getElementById("amount").value);
      const type = document.getElementById("type").value;
      const category =
        type === "expense" ? document.getElementById("category").value : "";
      const date = new Date().toISOString();

      if (!description || isNaN(amount)) return;

      addTransaction({ description, amount, type, category, date });
      transactionForm.reset();
      toggleCategoryDropdown();
    });

    toggleCategoryDropdown();
  }

  renderTransactions();
  updateDashboardSummary();
});

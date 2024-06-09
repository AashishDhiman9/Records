document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recordForm');
    const recordsTableBody = document.getElementById('recordsTableBody');
    const totalSales = document.getElementById('totalSales');
    const totalExpenditure = document.getElementById('totalExpenditure');
    const totalProfit = document.getElementById('totalProfit');
    const downloadPDFButton = document.getElementById('downloadPDF');
    const reportForm = document.getElementById('reportForm');

    // Load records from local storage if available
    let records = JSON.parse(localStorage.getItem('records')) || [];

    // Function to update local storage with new records
    function updateLocalStorage() {
        localStorage.setItem('records', JSON.stringify(records));
    }

    // Function to update the table with records
    function updateTable() {
        recordsTableBody.innerHTML = '';
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.incomeSource}</td>
                <td>${record.sales}</td>
                <td>${record.expenditureDetails}</td>
                <td>${record.expenditure}</td>
                <td>${record.profit}</td>
            `;
            recordsTableBody.appendChild(row);
        });
    }

    // Function to update totals
    function updateTotals() {
        const salesSum = records.reduce((sum, record) => sum + record.sales, 0);
        const expenditureSum = records.reduce((sum, record) => sum + record.expenditure, 0);
        const profitSum = salesSum - expenditureSum;

        totalSales.textContent = salesSum;
        totalExpenditure.textContent = expenditureSum;
        totalProfit.textContent = profitSum;
    }

    // Function to handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get form values
        const date = document.getElementById('date').value;
        const incomeSource = document.getElementById('incomeSource').value;
        const sales = parseFloat(document.getElementById('sales').value);
        const expenditureDetails = document.getElementById('expenditureDetails').value || 'N/A';
        const expenditure = parseFloat(document.getElementById('expenditure').value) || 0;
        const profit = sales - expenditure;

        // Create record object
        const record = { date, incomeSource, sales, expenditureDetails, expenditure, profit };

        // Add record to array
        records.push(record);

        // Update table and totals
        updateTable();
        updateTotals();

        // Update local storage
        updateLocalStorage();
    });

    // Function to handle PDF download
    downloadPDFButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text('Nitin General Store - Report', 10, 10);

        const headers = ["Date", "Income Source", "Sales", "Expenditure Details", "Expenditure", "Profit"];
        const data = records.map(record => [record.date, record.incomeSource, record.sales, record.expenditureDetails, record.expenditure, record.profit]);

        doc.autoTable({
            head: [headers],
            body: data
        });

        doc.save('khata_record.pdf');
    });

    // Rest of your code...
});

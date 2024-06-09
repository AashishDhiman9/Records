document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recordForm');
    const recordsTableBody = document.getElementById('recordsTableBody');
    const totalSales = document.getElementById('totalSales');
    const totalExpenditure = document.getElementById('totalExpenditure');
    const totalProfit = document.getElementById('totalProfit');
    const downloadPDFButton = document.getElementById('downloadPDF');
    const reportForm = document.getElementById('reportForm');

    let records = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const date = document.getElementById('date').value;
        const incomeSource = document.getElementById('incomeSource').value;
        const sales = parseFloat(document.getElementById('sales').value);
        const expenditureDetails = document.getElementById('expenditureDetails').value || 'N/A';
        const expenditure = parseFloat(document.getElementById('expenditure').value) || 0;
        const profit = sales - expenditure;

        const record = { date, incomeSource, sales, expenditureDetails, expenditure, profit };
        records.push(record);
        updateTable();
        updateTotals();
    });

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

    function updateTotals() {
        const salesSum = records.reduce((sum, record) => sum + record.sales, 0);
        const expenditureSum = records.reduce((sum, record) => sum + record.expenditure, 0);
        const profitSum = salesSum - expenditureSum;

        totalSales.textContent = salesSum;
        totalExpenditure.textContent = expenditureSum;
        totalProfit.textContent = profitSum;
    }

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

    reportForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        const filteredRecords = records.filter(record => record.date >= startDate && record.date <= endDate);

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(`Expenditure Report - ${startDate} to ${endDate}`, 10, 10);

        let y = 20;
        filteredRecords.forEach(record => {
            doc.text(`Date: ${record.date}`, 10, y);
            doc.text(`Income Source: ${record.incomeSource}`, 10, y + 10);
            doc.text(`Sales: ${record.sales}`, 10, y + 20);
            doc.text(`Expenditure Details: ${record.expenditureDetails}`, 10, y + 30);
            doc.text(`Expenditure: ${record.expenditure}`, 10, y + 40);
            doc.text(`Profit: ${record.profit}`, 10, y + 50);
            y += 60;
        });

        doc.save(`expenditure_report_${startDate}_to_${endDate}.pdf`);
    });

});

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportLeads = (leads) => {
  if (!leads || leads.length === 0) {
    alert("No leads available to export.");
    return;
  }

  // 🔹 Export to Excel (.xlsx)
  const worksheet = XLSX.utils.json_to_sheet(leads);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
  XLSX.writeFile(workbook, "leads.xlsx");

  // 🔹 Export to PDF
  const doc = new jsPDF();
  const tableData = leads.map((lead, i) => [
    i + 1,
    lead.name,
    lead.email,
    lead.message,
    new Date(lead.submitted).toLocaleString(),
  ]);
  doc.text("Leads Report", 14, 10);
  doc.autoTable({
    head: [["#", "Name", "Email", "Message", "Submitted"]],
    body: tableData,
  });
  doc.save("leads.pdf");
};

const CompanyDetailsTab = ({ company }) => {
  const details = [
    { label: "Name", value: company?.name || company?.companyName || "N/A" },
    { label: "Website", value: company?.website || "N/A" },
    {
      label: "Company Owner",
      value: company?.owner || company?.companyOwner || "N/A",
    },
    {
      label: "Mobile Number",
      value: company?.mobile || company?.phone || "N/A",
    },
    {
      label: "Company Type",
      value: company?.type || company?.companyType || "N/A",
    },
    {
      label: "Company Address",
      value: company?.address || company?.companyAddress || "N/A",
    },
    {
      label: "Industry Type",
      value: company?.industry || company?.industryType || "N/A",
    },
    {
      label: "PAN Card Number",
      value: company?.pan || company?.panCard || "N/A",
    },
    { label: "GSTIN", value: company?.gstin || "N/A" },
    { label: "Bank Name", value: company?.bankName || "N/A" },
    { label: "Bank Account Number", value: company?.bankAccount || "N/A" },
    { label: "Cancelled Cheque", value: company?.cancelledCheque || "N/A" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Client Details</h3>

      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="flex gap-16 border-b-1 border-gray2 pb-2">
            <div className="font-medium w-40">{detail.label}</div>
            <div className="text-gray-600">{detail.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyDetailsTab;

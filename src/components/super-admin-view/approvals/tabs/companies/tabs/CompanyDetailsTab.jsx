const CompanyDetailsTab = ({ company }) => {
  const details = [
    { label: "Name", value: "ABC Company" },
    { label: "Website", value: "www.abccompany.com" },
    { label: "Company Owner", value: "John Doe" },
    { label: "Mobile Number", value: "+1 234 567 890" },
    { label: "Company Type", value: "Private" },
    { label: "Company Address", value: "123 Main St, City, Country" },
    { label: "Industry Type", value: "Technology" },
    { label: "PAN Card Number", value: "ABCDE1234F" },
    { label: "GSTIN", value: "22AAAAA0000A1Z5" },
    { label: "Bank Name", value: "Bank of America" },
    { label: "Bank Account Number", value: "1234567890" },
    { label: "Cancelled Cheque", value: "test.pdf" },
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

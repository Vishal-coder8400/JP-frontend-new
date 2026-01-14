const CompanyClientDetails = ({ company }) => {
  const details = [
    { label: "Name", value: company?.basicInformation?.companyName || "-" },
    { label: "Website", value: company?.basicInformation?.websiteURL || "-" },
    {
      label: "Company Owner",
      value: company?.spocInformation?.fullName || "-",
    },
    {
      label: "SPOC Mobile Number",
      value:
        `${company?.spocInformation?.contactNumber?.countryCode}-${company?.spocInformation?.contactNumber?.number}` ||
        "-",
    },
    {
      label: "SPOC Email",
      value: company?.spocInformation?.email || "-",
    },
    {
      label: "Company Email",
      value: company?.basicInformation?.companyEmail || "-",
    },
    {
      label: "Company Type",
      value: company?.basicInformation?.companyType || "-",
    },
    {
      label: "Current Address",
      value: company?.companyDetails?.currentAddress || "-",
    },
    {
      label: "Current City",
      value: company?.companyDetails?.city || "-",
    },
    {
      label: "Current State",
      value: company?.companyDetails?.state || "-",
    },
    {
      label: "Current Pincode",
      value: company?.companyDetails?.pincode || "-",
    },
    {
      label: "Industry Type",
      value: company?.companyDetails?.industryType || "-",
    },
    {
      label: "PAN Card Number",
      value: company?.companyDetails?.panCardNumber || "-",
    },
    {
      label: "PAN Card",
      value: company?.companyDetails?.panCardFile || "-",
    },
    { label: "GSTIN", value: company?.companyDetails?.gstin || "-" },
    { label: "Bank Name", value: company?.companyDetails?.bankName || "-" },
    {
      label: "Bank Account Number",
      value: company?.companyDetails?.bankAccountNumber || "-",
    },
    {
      label: "IFSC Code",
      value: company?.companyDetails?.ifscCode || "-",
    },
    {
      label: "Cancelled Cheque",
      value: company?.companyDetails?.chequeOrStatementFile || "-",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Client Details</h3>

      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="flex gap-16 border-b-1 border-gray2 pb-2">
            <div className="font-medium w-40">{detail.label}</div>
            <div className="text-gray-600">
              {(detail.label === "Cancelled Cheque" ||
                detail.label === "PAN Card") &&
              detail.value !== "-" ? (
                <a
                  href={detail.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              ) : (
                detail.value
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyClientDetails;

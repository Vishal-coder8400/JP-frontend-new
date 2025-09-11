const CompanyStats = ({ company }) => {
  return (
    <div className="grid grid-cols-4 gap-6 w-full">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium text-[16px]">Total Applications</p>
            <p className="text-lg font-semibold bg-gray2 p-2 mt-2 w-fit">
              {company.totalApplicants}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium text-[16px]">Accepted Candidates</p>
            <p className="text-lg font-semibold bg-success2 text-success1 p-2 mt-2 w-fit">
              {company.acceptedApplicants}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium text-[16px]">Rejected Candidates</p>
            <p className="text-lg font-semibold bg-danger2 text-danger1 p-2 mt-2 w-fit">
              {company.rejectedApplicants}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium text-[16px]">Hold/Under Review</p>
            <p className="text-lg font-semibold bg-warning2 text-warning1 p-2 mt-2 w-fit">
              {company.pendingApplicants}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStats;

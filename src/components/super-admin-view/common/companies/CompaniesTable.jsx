import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Sheet, SheetContent } from "../../../ui/sheet";
import { Building2 } from "lucide-react";
import { useState } from "react";
import CompanyDetailsDrawer from "./CompanyDetailsDrawer";
import AdminStatusBadge from "../../shared/AdminStatusBadge";
import { getRelativeTime } from "../../../../utils/relativeTime";

const CompaniesTable = ({
  paginatedCompanies,
  context = "database", // "database" or "approvals"
  onRevalidate,
}) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSelectCompany = (companyId) => {
    setSelectedCompanyId(companyId);
  };

  const handleRowClick = (company, event) => {
    if (event.target.type === "radio") {
      return;
    }

    setSelectedCompany(company);
    setDrawerOpen(true);
  };

  const getCompanyId = (company) => {
    if (context === "approvals") {
      return company._id;
    }
    return company._id;
  };

  const renderStatusColumn = () => {
    if (context !== "approvals") return null;

    return <TableHead className="w-[120px] font-semibold">Status</TableHead>;
  };

  const renderStatusCell = (company) => {
    if (context !== "approvals") return null;

    return (
      <TableCell>
        <AdminStatusBadge status={company.status} />
      </TableCell>
    );
  };

  const getColSpan = () => {
    return context === "approvals" ? 9 : 8;
  };

  const renderDrawer = () => {
    return (
      <CompanyDetailsDrawer
        companyId={
          context === "approvals"
            ? selectedCompany?.data?._id
            : selectedCompany?._id
        }
        context={context}
        approvalId={context === "approvals" ? selectedCompany?._id : undefined}
        approvalStatus={
          context === "approvals" ? selectedCompany?.status : undefined
        }
        onClose={() => setDrawerOpen(false)}
        onRevalidate={onRevalidate}
      />
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-x-auto">
        <Table className={"table-fixed min-w-[1240px]"}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px] font-semibold"></TableHead>
              <TableHead className="w-[160px] font-semibold">ID</TableHead>
              <TableHead className="w-[200px] font-semibold">Name</TableHead>
              {context === "approvals" ? (
                <>
                  <TableHead className="w-[140px] font-semibold">
                    Company Type
                  </TableHead>
                  <TableHead className="w-[200px] font-semibold">
                    Email
                  </TableHead>
                  <TableHead className="w-[160px] font-semibold">
                    Contact Number
                  </TableHead>
                  <TableHead className="w-[120px] font-semibold">
                    Location
                  </TableHead>
                  <TableHead className="w-[120px] font-semibold">
                    Posted Date
                  </TableHead>
                  {renderStatusColumn()}
                </>
              ) : (
                <>
                  <TableHead className="w-[140px] font-semibold">
                    Sector
                  </TableHead>
                  <TableHead className="w-[240px] font-semibold">
                    Contact
                  </TableHead>
                  <TableHead className="w-[100px] font-semibold">
                    Total Posts
                  </TableHead>
                  <TableHead className="w-[120px] font-semibold">
                    Location
                  </TableHead>
                  <TableHead className="w-[120px] font-semibold">
                    Last Updated
                  </TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCompanies.length > 0 ? (
              paginatedCompanies.map((company) => (
                <TableRow
                  key={getCompanyId(company)}
                  onClick={(e) => handleRowClick(company, e)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-center w-[40px]">
                    <input
                      type="radio"
                      name="selectCompany"
                      checked={selectedCompanyId === getCompanyId(company)}
                      onChange={() =>
                        handleSelectCompany(getCompanyId(company))
                      }
                      aria-label={`Select company ${
                        context === "approvals"
                          ? company.basicInformation?.company || "-"
                          : company.companyName || "-"
                      }`}
                      className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                    />
                  </TableCell>
                  <TableCell
                    className="w-[160px] max-w-[160px] truncate"
                    title={String(getCompanyId(company))}
                  >
                    {getCompanyId(company)}
                  </TableCell>
                  <TableCell
                    className="w-[200px] max-w-[200px] truncate"
                    title={
                      context === "approvals"
                        ? company?.data?.basicInformation?.companyName || "-"
                        : company?.companyName || "-"
                    }
                  >
                    {context === "approvals"
                      ? company?.data?.basicInformation?.companyName || "-"
                      : company?.companyName || "-"}
                  </TableCell>
                  {context === "approvals" ? (
                    <>
                      <TableCell
                        className="w-[140px] max-w-[140px] truncate"
                        title={
                          company?.data?.basicInformation?.companyType || "-"
                        }
                      >
                        {company?.data?.basicInformation?.companyType || "-"}
                      </TableCell>
                      <TableCell
                        className="w-[200px] max-w-[200px] truncate"
                        title={
                          company?.data?.basicInformation?.companyEmail || "-"
                        }
                      >
                        {company?.data?.basicInformation?.companyEmail || "-"}
                      </TableCell>
                      <TableCell className="w-[160px] max-w-[160px]">
                        {company?.data?.basicInformation
                          ?.companyContactNumber ? (
                          <span
                            className="block truncate"
                            title={`${company?.data?.basicInformation?.companyContactNumber?.countryCode}-${company?.data?.basicInformation?.companyContactNumber?.number}`}
                          >
                            {
                              company?.data?.basicInformation
                                ?.companyContactNumber?.countryCode
                            }
                            -
                            {
                              company?.data?.basicInformation
                                ?.companyContactNumber?.number
                            }
                          </span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell
                        className="w-[120px] max-w-[120px] truncate"
                        title={
                          company?.data?.basicInformation?.address?.city ||
                          company?.data?.basicInformation?.address?.state ||
                          "-"
                        }
                      >
                        {context === "database"
                          ? company?.location || "-"
                          : `${company?.data?.city}, ${company?.data?.state}` ||
                            "-"}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {company.submittedAt
                          ? getRelativeTime(company.submittedAt)
                          : "-"}
                      </TableCell>
                      {renderStatusCell(company)}
                    </>
                  ) : (
                    <>
                      <TableCell
                        className="w-[140px] max-w-[140px] truncate"
                        title={
                          company?.companyDetails?.industryType ||
                          company?.industryType ||
                          "-"
                        }
                      >
                        {company?.companyDetails?.industryType ||
                          company?.industryType ||
                          "-"}
                      </TableCell>
                      <TableCell className="w-[240px] max-w-[240px]">
                        <div className="flex flex-col gap-2">
                          <span
                            className="block truncate"
                            title={`${company?.contactNumber?.countryCode}-${company?.contactNumber?.number}`}
                          >
                            {company?.contactNumber?.countryCode}-
                            {company?.contactNumber?.number}
                          </span>
                          <span
                            className="block truncate"
                            title={
                              company?.email ||
                              company?.basicInformation?.companyEmail ||
                              "-"
                            }
                          >
                            {company?.email ||
                              company?.basicInformation?.companyEmail ||
                              "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="w-[100px]">
                        {company?.jobsPosted}
                      </TableCell>
                      <TableCell
                        className="w-[120px] max-w-[120px] truncate"
                        title={company?.location || "-"}
                      >
                        {context === "database"
                          ? company?.location || "-"
                          : `${company?.data?.city}, ${company?.data?.state}` ||
                            "-"}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {company.updatedAt
                          ? getRelativeTime(company.updatedAt)
                          : "-"}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={getColSpan()} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Building2 className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-500">
                      No companies found matching your criteria
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="w-full h-screen lg:max-w-[750px] md:max-w-full sm:max-w-full overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <div className="w-full h-full">{renderDrawer()}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CompaniesTable;

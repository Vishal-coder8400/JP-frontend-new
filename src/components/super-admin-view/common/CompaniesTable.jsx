import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Sheet, SheetContent } from "../../ui/sheet";
import { Building2 } from "lucide-react";
import { useState } from "react";
import CompanyDetailsDrawer from "./CompanyDetailsDrawer";
import AdminStatusBadge from "../shared/AdminStatusBadge";

const CompaniesTable = ({
  paginatedCompanies,
  context = "database", // "database" or "approvals"
  onRevalidate,
  handleDeleteCompany,
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
    return context === "approvals" ? company.id : company._id;
  };

  const getCompanyName = (company) => {
    return company.name || "-";
  };

  const getCompanyIndustry = (company) => {
    return company.industry || "-";
  };

  const getCompanyContact = (company) => {
    return company.contact || company.email || "-";
  };

  const renderStatusColumn = () => {
    if (context !== "approvals") return null;

    return (
      <TableHead className="min-w-[120px] font-semibold">Status</TableHead>
    );
  };

  const renderStatusCell = (company) => {
    if (context !== "approvals") return null;

    return (
      <TableCell>
        <AdminStatusBadge status={company.approvalStatus} />
      </TableCell>
    );
  };

  const renderLastUpdatedColumn = () => {
    if (context !== "approvals") return null;

    return (
      <TableHead className="min-w-[120px] font-semibold">
        Last Updated
      </TableHead>
    );
  };

  const renderLastUpdatedCell = (company) => {
    if (context !== "approvals") return null;

    return <TableCell>{company.lastUpdated || "-"}</TableCell>;
  };

  const renderJobsColumn = () => {
    if (context !== "database") return null;

    return (
      <TableHead className="min-w-[100px] font-semibold">Jobs Posted</TableHead>
    );
  };

  const renderJobsCell = (company) => {
    if (context !== "database") return null;

    return <TableCell>{company.jobs || "-"}</TableCell>;
  };

  const renderLocationColumn = () => {
    if (context !== "database") return null;

    return (
      <TableHead className="min-w-[150px] font-semibold">Location</TableHead>
    );
  };

  const renderLocationCell = (company) => {
    if (context !== "database") return null;

    return <TableCell>{company.location || "-"}</TableCell>;
  };

  const getColSpan = () => {
    return context === "approvals" ? 7 : 8;
  };

  const renderDrawer = () => {
    return (
      <CompanyDetailsDrawer
        companyId={selectedCompany?._id}
        company={selectedCompany}
        context={context}
        onClose={() => setDrawerOpen(false)}
        onRevalidate={onRevalidate}
      />
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <div
            className={
              context === "approvals" ? "min-w-[1000px]" : "max-w-[900px]"
            }
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[40px] font-semibold"></TableHead>
                  <TableHead className="min-w-[80px] font-semibold">
                    ID
                  </TableHead>
                  <TableHead className="min-w-[180px] font-semibold">
                    Name
                  </TableHead>
                  <TableHead className="min-w-[120px] font-semibold">
                    Industry
                  </TableHead>
                  <TableHead className="min-w-[180px] font-semibold">
                    Contact
                  </TableHead>
                  {renderJobsColumn()}
                  {renderLocationColumn()}
                  {renderLastUpdatedColumn()}
                  {renderStatusColumn()}
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
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name="selectCompany"
                          checked={selectedCompanyId === getCompanyId(company)}
                          onChange={() =>
                            handleSelectCompany(getCompanyId(company))
                          }
                          aria-label={`Select company ${getCompanyName(
                            company
                          )}`}
                          className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                        />
                      </TableCell>
                      <TableCell>{getCompanyId(company)}</TableCell>
                      <TableCell>{getCompanyName(company)}</TableCell>
                      <TableCell>{getCompanyIndustry(company)}</TableCell>
                      <TableCell>{getCompanyContact(company)}</TableCell>
                      {renderJobsCell(company)}
                      {renderLocationCell(company)}
                      {renderLastUpdatedCell(company)}
                      {renderStatusCell(company)}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={getColSpan()}
                      className="text-center py-8"
                    >
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
        </div>
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

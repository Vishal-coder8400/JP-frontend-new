import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/table";
import { Sheet, SheetContent } from "../../../../ui/sheet";
import { Building2 } from "lucide-react";
import CompanyDetailsDrawer from "./CompanyDetailsDrawer";

import { useState } from "react";

const CompaniesTable = ({ paginatedCompanies }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSelectCompany = (companyId) => {
    setSelectedCompanyId(companyId);
  };

  const handleRowClick = (company, event) => {
    // Don't open drawer if radio button was clicked
    if (event.target.type === "radio") {
      return;
    }

    setSelectedCompany(company);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto max-w-[900px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[40px] font-semibold"></TableHead>
                <TableHead className="min-w-[80px] font-semibold">ID</TableHead>
                <TableHead className="min-w-[180px] font-semibold">
                  Name
                </TableHead>
                <TableHead className="min-w-[120px] font-semibold">
                  Industry
                </TableHead>
                <TableHead className="min-w-[180px] font-semibold">
                  Contact
                </TableHead>
                <TableHead className="min-w-[100px] font-semibold">
                  Jobs Posted
                </TableHead>
                <TableHead className="min-w-[150px] font-semibold">
                  Location
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCompanies.length > 0 ? (
                paginatedCompanies.map((company) => (
                  <TableRow
                    key={company._id}
                    onClick={(e) => handleRowClick(company, e)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-center">
                      <input
                        type="radio"
                        name="selectCompany"
                        checked={selectedCompanyId === company._id}
                        onChange={() => handleSelectCompany(company._id)}
                        aria-label={`Select company ${
                          company.name || company._id
                        }`}
                        className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                      />
                    </TableCell>
                    <TableCell>{company._id}</TableCell>
                    <TableCell>{company.name || "-"}</TableCell>
                    <TableCell>{company.industry || "-"}</TableCell>
                    <TableCell>
                      {company.contact || company.email || "-"}
                    </TableCell>
                    <TableCell>{company.jobs || "-"}</TableCell>
                    <TableCell>{company.location || "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
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

      {/* Company Details Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="
            w-full h-screen 
            lg:max-w-[750px] 
            md:max-w-full
            sm:max-w-full 
            overflow-y-auto border-transparent [&>button.absolute]:hidden"
        >
          <div className="w-full h-full">
            <CompanyDetailsDrawer companyId={selectedCompany?._id} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CompaniesTable;

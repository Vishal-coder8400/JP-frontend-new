import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../ui/table";
import { User } from "lucide-react";

import { useState } from "react";

const TrainersTable = ({ paginatedTrainers }) => {
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);

  const handleSelectTrainer = (trainerId) => {
    setSelectedTrainerId(trainerId);
  };

  const handleRowClick = (trainer, event) => {
    // Don't open drawer if radio button was clicked
    if (event.target.type === "radio") {
      return;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[40px] font-semibold"></TableHead>
                <TableHead className="min-w-[80px] font-semibold">ID</TableHead>
                <TableHead className="min-w-[250px] font-semibold">
                  Name
                </TableHead>
                <TableHead className="min-w-[120px] font-semibold">
                  Expertise
                </TableHead>
                <TableHead className="min-w-[150px] font-semibold">
                  Specialization
                </TableHead>
                <TableHead className="min-w-[100px] font-semibold">
                  Experience
                </TableHead>
                <TableHead className="min-w-[120px] font-semibold">
                  Last Updated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTrainers.length > 0 ? (
                paginatedTrainers.map((trainer) => (
                  <TableRow
                    key={trainer.id}
                    onClick={(e) => handleRowClick(trainer, e)}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-center">
                      <input
                        type="radio"
                        name="selectTrainer"
                        checked={selectedTrainerId === trainer.id}
                        onChange={() => handleSelectTrainer(trainer.id)}
                        aria-label={`Select trainer ${trainer.name}`}
                        className="w-4 h-4 text-primary-purple border-2 border-gray-300 focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:bg-primary-purple checked:border-primary-purple relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-white before:rounded-full before:opacity-0 checked:before:opacity-100"
                      />
                    </TableCell>
                    <TableCell>{trainer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* {trainer.avatar ? (
                          <img
                            src={trainer.avatar}
                            alt={`${trainer.name} avatar`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : ( */}
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        {/* )} */}
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {trainer.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {trainer.title}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{trainer.expertise}</TableCell>
                    <TableCell>{trainer.specialization}</TableCell>
                    <TableCell>{trainer.experience}</TableCell>
                    <TableCell>{trainer.lastUpdated}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <User className="h-8 w-8 text-gray-400" />
                      <span className="text-gray-500">
                        No trainers found matching your criteria
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TrainersTable;

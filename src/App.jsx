import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/common/scrollToTop";
import CheckAuth from "./components/common/checkAuth";
import { motion } from "framer-motion";
import Layout from "./components/recruiter-view/layout";
import ProfileSetupLayout from "./components/recruiter-view/profile-setup-layout";

import { useGetUserProfile as useGetRecruiterUserProfile } from "./hooks/recruiter/useProfile";
import { useGetCorporateUserProfile } from "./hooks/corporate/useProfile";
import { useGetJobseekerProfile } from "./hooks/job-seeker/useProfile";

import useAuthStore from "./stores/useAuthStore";

// Recruiter Pages
import RecruiterLogin from "./pages/recruiter-view/log-in";
import RecruiterDashboard from "./pages/recruiter-view/dashboard";
import JobOpenings from "./pages/recruiter-view/job-openings";
import Candidates from "./pages/recruiter-view/candidates";
import CandidateCreate from "./pages/recruiter-view/candidate-create";
import CandidateReleventDetails from "./pages/recruiter-view/candidate-releventDetails";
import MatchesAndSubmission from "./pages/recruiter-view/matches-and-submission";
import BasicDetails from "./pages/recruiter-view/basic-details";
import KycVerification from "./pages/recruiter-view/kyc-verification";
import SectoralDetails from "./pages/recruiter-view/sectoral-details";
import QualificationDetails from "./pages/recruiter-view/qualification-details";
import Profile from "./pages/recruiter-view/profile";
import Faq from "./pages/recruiter-view/faq";

// Corporate Pages
import CorporateLogIn from "./pages/corporate-view/log-in";
import CorporateDashboard from "./pages/corporate-view/dashboard";
import CorporateBasicDetails from "./pages/corporate-view/basic-details";
import FinalSetup from "./pages/corporate-view/final-setup";
import Analytics from "./pages/corporate-view/analytics";
import Listing from "./pages/corporate-view/listing";
import ResumeFiltering from "./pages/corporate-view/resume-filtering";
import TrainningPosting from "./pages/corporate-view/trainning-posting";
import JobPosting from "./pages/corporate-view/job-posting";
import CorporateProfile from "./pages/corporate-view/profile";

// Job Seeker Pages
import JobSeekerLogin from "./pages/jobSeeker-view/log-in";
import SeekerBasicDetails from "./pages/jobSeeker-view/basic-details";
import EducationDetails from "./pages/jobSeeker-view/education-details";
import WorkingDetails from "./pages/jobSeeker-view/working-details";
import CertificateDetails from "./pages/jobSeeker-view/certificate-details";
import JobSeekerDashboard from "./pages/jobSeeker-view/dashboard";
import AdditionalDetails from "./pages/jobSeeker-view/additional-details";
import JobDescription from "./pages/jobSeeker-view/job-description";
import SeekerSeach from "./pages/jobSeeker-view/search";

// Trainer pages
import TrainerLogin from "./pages/trainner-view/log-in";
import TrainerBasicDetails from "./pages/trainner-view/basic-details";
import TrainerEducation from "./pages/trainner-view/education-details";
import TrainerWorking from "./pages/trainner-view/working-details";
import TrainerCertificate from "./pages/trainner-view/certificate-details";
import TrainerAdditional from "./pages/trainner-view/additional-details";
import TrainerProfile from "./pages/trainner-view/profile";

// Super Admin Pages
import SuperAdminLogin from "./pages/super-admin-view/log-in";
import SuperAdminLayout from "./components/super-admin-view/shared/Layout";
import SuperAdminDashboard from "./pages/super-admin-view/dashboard";
import SuperAdminDatabasePage from "./pages/super-admin-view/database";
import SuperAdminJobsAndTrainingsPage from "./pages/super-admin-view/jobs-and-trainings/jobs-and-trainings";
import SuperAdminApprovals from "./pages/super-admin-view/approvals";
import SuperAdminAdminManagementPage from "./pages/super-admin-view/admin-management";
import SuperAdminMasterDataPage from "./pages/super-admin-view/master-data";
import ApplicationsTab from "./components/super-admin-view/common/applications/ApplicationsTab";
import TrainerDashboard from "./pages/trainner-view/dashboard";
import TrainerJobDescription from "./pages/trainner-view/job-description";
import { useGetTrainerProfile } from "./hooks/trainer/useProfile";
import SuperAdminAuth from "./components/common/superAdminAuth";
import Congratulation from "./pages/common/congratulation";
import TrainingListing from "./pages/corporate-view/trainingListing";
import AppliedCandidatesJobs from "./pages/corporate-view/applied-candidates-jobs";
import AppliedCandidatesTrainings from "./pages/corporate-view/applied-candidates-trainings";

function App() {
  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    const store = useAuthStore.getState();

    if (token) {
      store.setToken(token, !!localStorage.getItem("token"));
      store.setIsAuthenticated(true);
    } else {
      store.setTokenInitialized(); // ✅ even if no token, we set initialized
    }
  }, []);
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ScrollToTop />
      <Routes>
        {/* Home redirect */}

        <Route
          path="/"
          element={
            <div className="relative min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(56.26%_78.16%_at_50%_0%,_#DED6FF_1.9%,_#8E77E4_48.03%,_#141E2B_100%)] backdrop-blur-0 text-white overflow-hidden">
              {/* Glow background */}
              {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0)_70%)]"></div> */}

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-center z-10"
              >
                Smarter Hiring, <br /> Stronger Careers
              </motion.h1>

              {/* Subtext */}
              <p className="text-center text-gray-300 mt-4 max-w-xl z-10">
                Mollit in laborum tempor Lorem incididunt irure. Aute ex ad
                sunt.
              </p>

              {/* Search bar */}
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mt-8 z-10 w-[90%] max-w-md border border-white/20">
                <input
                  type="text"
                  placeholder="Enter skills / designations / companies"
                  className="bg-transparent outline-none flex-1 text-white placeholder-gray-400"
                />
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-full">
                  Search
                </button>
              </div>

              {/* Floating cards */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Example card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-[20%] left-[10%] backdrop-blur-md border-gradient rounded-xl p-6 w-50 h-[247px] shadow-[0px_4px_30.3px_0px_#0000001A] bg-[linear-gradient(35.34deg,_#161730_40.42%,_#6945ED_120.63%)]"
                >
                  <h3 className="font-semibold text-lg mb-1">Trainers</h3>
                  <p className="text-sm text-gray-300">
                    Upskill with expert-led programs
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-[25%] left-[15%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-48 shadow-lg"
                >
                  <h3 className="font-semibold text-lg mb-1">Job Seekers</h3>
                  <p className="text-sm text-gray-300">
                    Find jobs, track applications
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-[25%] right-[15%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-48 shadow-lg"
                >
                  <h3 className="font-semibold text-lg mb-1">Recruiters</h3>
                  <p className="text-sm text-gray-300">
                    Manage top talent efficiently
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-[20%] right-[10%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-48 shadow-lg"
                >
                  <h3 className="font-semibold text-lg mb-1">Referrers</h3>
                  <p className="text-sm text-gray-300">
                    Earn by referring candidates
                  </p>
                </motion.div>
              </div>
            </div>
          }
        />

        {/* Super Admin Home redirect */}
        <Route
          path="/super-admin"
          element={
            <SuperAdminAuth>
              <SuperAdminLayout />
            </SuperAdminAuth>
          }
        >
          <Route
            index
            element={<Navigate to="/super-admin/database" replace />}
          />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="database" element={<SuperAdminDatabasePage />} />
          <Route
            path="jobs-and-trainings"
            element={<SuperAdminJobsAndTrainingsPage />}
          />
          <Route
            path="jobs-and-trainings/:id/candidates"
            element={<ApplicationsTab isBackBtnEnabled />}
          />
          <Route path="approvals" element={<SuperAdminApprovals />} />
          <Route
            path="admin-management"
            element={<SuperAdminAdminManagementPage />}
          />
          <Route path="master-data" element={<SuperAdminMasterDataPage />} />
        </Route>

        {/* Recruiter Auth and Setup */}
        <Route
          path="/recruiter"
          element={
           /* <CheckAuth
              fetchProfileHook={useGetRecruiterUserProfile}
              allowedRoles={["recruiter"]}
              userRole={"recruiter"}
            >*/
              <ProfileSetupLayout />
            //</CheckAuth>
          }
        >
          <Route path="log-in" element={<RecruiterLogin />} />
        </Route>
        <Route
          path="/recruiter/profile-setup"
          element={
            /**<CheckAuth
              fetchProfileHook={useGetRecruiterUserProfile}
              allowedRoles={["recruiter"]}
              userRole={"recruiter"}
            >*/
              <ProfileSetupLayout />
            //</CheckAuth>
          }
        >
          <Route path="basic-details" element={<BasicDetails />} />
          <Route path="kyc-verification" element={<KycVerification />} />
          <Route path="sectoral-details" element={<SectoralDetails />} />
          <Route
            path="qualification-details"
            element={<QualificationDetails />}
          />
        </Route>

        {/* Recruiter Main Dashboard */}
        <Route
          path="/recruiter"
          element={
            <CheckAuth
              fetchProfileHook={useGetRecruiterUserProfile}
              allowedRoles={["recruiter"]}
              userRole={"recruiter"}
            >
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="candidates" element={<Candidates />} />
          <Route
            path="candidates/candidate-create"
            element={<CandidateCreate />}
          />
          <Route
            path="candidates/relevent-details"
            element={<CandidateReleventDetails />}
          />
          <Route path="job-openings" element={<JobOpenings />} />
          <Route
            path="matches-and-submissions"
            element={<MatchesAndSubmission />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="faq" element={<Faq />} />
        </Route>
         {/**Corporate Login */} 
        
         <Route path="/corporate/log-in" element={<CorporateLogIn />} />
        {/* Corporate Auth and Setup */}
        <Route
          path="/corporate"
          element={
            <CheckAuth
              fetchProfileHook={useGetCorporateUserProfile}
              allowedRoles={["corporate"]}
              userRole={"corporate"}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
       
          <Route path="trainning-posting" element={<TrainningPosting />} />
          <Route path="job-posting" element={<JobPosting />} />
        </Route>
        <Route
          path="/corporate/profile-setup"
          element={
            <CheckAuth
              fetchProfileHook={useGetCorporateUserProfile}
              allowedRoles={["corporate"]}
              userRole={"corporate"}
              lockedPages={{
                "/corporate/profile-setup/basic-details": "page1",
                "/corporate/profile-setup/final-setup": "page2",
              }}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="basic-details" element={<CorporateBasicDetails />} />
          <Route path="final-setup" element={<FinalSetup />} />
        </Route>

        {/* Corporate Main Dashboard */}
        <Route
          path="/corporate"
          element={
            <CheckAuth
              fetchProfileHook={useGetCorporateUserProfile}
              allowedRoles={["corporate"]}
              userRole={"corporate"}
            >
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<CorporateDashboard />} />
          <Route path="job-posting/analytics" element={<Analytics />} />
          <Route path="job-posting/listing" element={<Listing />} />
          <Route
            path="job-posting/listing/:jobID"
            element={<AppliedCandidatesJobs />}
          />
          <Route path="training-listing" element={<TrainingListing />} />
          <Route
            path="training-listing/:trainingID"
            element={<AppliedCandidatesTrainings />}
          />
          <Route path="resume-filtering" element={<ResumeFiltering />} />
          <Route path="profile" element={<CorporateProfile />} />
        </Route>

        {/* Job Seeker Auth */}
        <Route
          path="/job-seeker"
          element={
            <CheckAuth
              fetchProfileHook={useGetJobseekerProfile}
              allowedRoles={["job-seeker"]}
              userRole={"job-seeker"}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="log-in" element={<JobSeekerLogin />} />
        </Route>

        {/* Job Seeker Profile Setup */}
        <Route
          path="/job-seeker/profile-setup"
          element={
            // <CheckAuth
            //   fetchProfileHook={useGetJobseekerProfile}
            //   allowedRoles={["job-seeker"]}
            // >
            <ProfileSetupLayout />
            // </CheckAuth>
          }
        >
          <Route path="basic-details" element={<SeekerBasicDetails />} />
          <Route path="education-details" element={<EducationDetails />} />
          <Route path="working-details" element={<WorkingDetails />} />
          <Route path="certificate-details" element={<CertificateDetails />} />
          <Route path="additional-details" element={<AdditionalDetails />} />
        </Route>
        <Route
          path="/job-seeker"
          element={
            // <CheckAuth
            //   fetchProfileHook={useGetJobseekerProfile}
            //   allowedRoles={["job-seeker"]}
            // >
            <Layout />
            // </CheckAuth>
          }
        >
          <Route path="dashboard" element={<JobSeekerDashboard />} />
          <Route path="dashboard/:id" element={<JobDescription />} />
          <Route path="search" element={<SeekerSeach />} />
          <Route path="faq" element={<Faq />} />
        </Route>
        {/* Trainer Dashboard */}
        <Route
          path="/trainer"
          element={
            <CheckAuth
              fetchProfileHook={useGetTrainerProfile}
              allowedRoles={["trainer"]}
              userRole={"trainer"}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="log-in" element={<TrainerLogin />} />
        </Route>

        {/* Job Seeker Profile Setup */}
        <Route
          path="/trainer/profile-setup"
          element={
            <CheckAuth
              fetchProfileHook={useGetTrainerProfile}
              allowedRoles={["trainer"]}
              userRole={"trainer"}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="basic-details" element={<TrainerBasicDetails />} />
          <Route path="education-details" element={<TrainerEducation />} />
          <Route path="working-details" element={<TrainerWorking />} />
          <Route path="certificate-details" element={<TrainerCertificate />} />
          <Route path="additional-details" element={<TrainerAdditional />} />
        </Route>

        <Route
          path="/trainer"
          element={
            <CheckAuth
              fetchProfileHook={useGetTrainerProfile}
              allowedRoles={["trainer"]}
              userRole={"trainer"}
            >
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<TrainerDashboard />} />
          <Route path="dashboard/:id" element={<TrainerJobDescription />} />
          <Route path="faq" element={<Faq />} />
          <Route path="profile" element={<TrainerProfile />} />
        </Route>

        {/* Super Admin Auth and Setup */}
        <Route path="/super-admin/log-in" element={<SuperAdminLogin />} />

        {/* Congrats fallback route */}
        <Route path="congratulation" element={<Congratulation />} />
      </Routes>
    </div>
  );
}

export default App;

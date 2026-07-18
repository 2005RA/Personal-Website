import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import AcademicAnalytics from './pages/projects/AcademicAnalytics.jsx'
import BankDeposits from './pages/projects/BankDeposits.jsx'
import ClinicDashboard from './pages/projects/ClinicDashboard.jsx'
import HrAnalytics from './pages/projects/HrAnalytics.jsx'
import InvestmentAnalysis from './pages/projects/InvestmentAnalysis.jsx'
import IsoTraining from './pages/projects/IsoTraining.jsx'
import Library from './pages/projects/Library.jsx'
import RegionalSales from './pages/projects/RegionalSales.jsx'
import SocialServices from './pages/projects/SocialServices.jsx'
import TravelBooking from './pages/projects/TravelBooking.jsx'
import HotelReservation from './pages/projects/HotelReservation.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/academic-analytics" element={<AcademicAnalytics />} />
      <Route path="/projects/bank-deposits" element={<BankDeposits />} />
      <Route path="/projects/clinic-dashboard" element={<ClinicDashboard />} />
      <Route path="/projects/hr-analytics" element={<HrAnalytics />} />
      <Route path="/projects/investment-analysis" element={<InvestmentAnalysis />} />
      <Route path="/projects/iso-training" element={<IsoTraining />} />
      <Route path="/projects/library" element={<Library />} />
      <Route path="/projects/regional-sales" element={<RegionalSales />} />
      <Route path="/projects/social-services" element={<SocialServices />} />
      <Route path="/projects/travel-booking" element={<TravelBooking />} />
      <Route path="/projects/hotel-reservation" element={<HotelReservation />} />

      {/* Safety-net aliases: in case anything still links to the old .html
          filenames (e.g. a browser bookmark, or a URL typed by hand), send
          them to the matching route instead of showing a blank page. */}
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/projects.html" element={<Navigate to="/projects" replace />} />
      <Route path="/project-academic-analytics.html" element={<Navigate to="/projects/academic-analytics" replace />} />
      <Route path="/project-bank-deposits.html" element={<Navigate to="/projects/bank-deposits" replace />} />
      <Route path="/project-clinic-dashboard.html" element={<Navigate to="/projects/clinic-dashboard" replace />} />
      <Route path="/project-hr-analytics.html" element={<Navigate to="/projects/hr-analytics" replace />} />
      <Route path="/project-investment-analysis.html" element={<Navigate to="/projects/investment-analysis" replace />} />
      <Route path="/project-iso-training.html" element={<Navigate to="/projects/iso-training" replace />} />
      <Route path="/project-library.html" element={<Navigate to="/projects/library" replace />} />
      <Route path="/project-regional-sales.html" element={<Navigate to="/projects/regional-sales" replace />} />
      <Route path="/project-social-services.html" element={<Navigate to="/projects/social-services" replace />} />
      <Route path="/project-travel-booking.html" element={<Navigate to="/projects/travel-booking" replace />} />

      {/* Anything else unrecognized -> home, instead of a blank white page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

import Sidebar from '../Sidebar';
import TopNavbar from '../TopNavbar';

const DashboardLayout = ({ children }) => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8f9fb',
      fontFamily: 'Inter, sans-serif',
    }}>
      <Sidebar />
      <div style={{
        flex: 1,
        marginLeft: '220px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <TopNavbar />
        <main style={{ flex: 1, padding: '28px 32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

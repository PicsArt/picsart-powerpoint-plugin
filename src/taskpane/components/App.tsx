import React, { useEffect, useState } from "react";
import InternetConnection from "@modals/InternetConnection";
import { IntroPage, Body} from "@pages/index";
import { Footer, LoadingSpinner } from "@ui/index";
import { isLocalKeyValid } from "@helpers/index";
import "@styles/global.scss";

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [loading, setLoading ] = useState<boolean>(true);
  const [loadMainContent, setLoadMainContent] = useState<boolean>(false);

  const handleLoadMainContent = (value: boolean) => {
    setLoadMainContent(value);
  };

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    const checkLocalKey = async () => {
      try {
        const isValid = await isLocalKeyValid();
        if (isValid) {
          handleLoadMainContent(true);
        }  else {
          handleLoadMainContent(false);
        }
      } catch (error) {
        handleLoadMainContent(false);
      } finally {
        setLoading(false);
      }
    }

    checkLocalKey();
  }, [])

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isOnline) {
    return <InternetConnection />;
  }

  return (
    <div className="root">
      {loadMainContent ? <Body /> : <IntroPage handleLoadMainContent={setLoadMainContent} />}
      <Footer />
    </div>
  );
};

export default App;


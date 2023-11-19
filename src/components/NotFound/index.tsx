import Button from '../ui/Button';

const NotFound = () => {
  return (
    <div className="text-center h-full flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Sorry, the page you are looking for could not be found.</p>
      <div className="flex justify-center">
        <Button variant="fill" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

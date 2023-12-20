import { useAuth } from '../../providers';

export const Quotes = () => {
  const { me } = useAuth();
  console.log(me?.firstName);

  return <h1>Quotes</h1>;
};

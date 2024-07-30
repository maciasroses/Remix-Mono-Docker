interface Card404Props {
  title: string;
  description: string;
}

const Card404 = ({ title, description }: Card404Props) => {
  return (
    <div className="p-4 text-center dark:text-white">
      <p className="text-5xl pb-4">X</p>
      <strong className="text-3xl">Not found</strong>
      <p className="text-2xl">{title}</p>
      <small className="text-xl">{description}</small>
    </div>
  );
};

export default Card404;

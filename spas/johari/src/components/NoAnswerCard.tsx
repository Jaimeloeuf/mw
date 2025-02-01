import LinkShareCard from "./LinkShareCard";

export default function NoAnswerCard(
  ...props: Parameters<typeof LinkShareCard>
) {
  return (
    <div>
      <p className="py-8 text-4xl font-thin italic">No answers yet</p>
      <LinkShareCard {...props[0]} />
    </div>
  );
}

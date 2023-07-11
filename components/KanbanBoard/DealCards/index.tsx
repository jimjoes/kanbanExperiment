import React from "react";
import dynamic from "next/dynamic";

const Draggable = dynamic(
  async () => {
    const mod = await import("react-beautiful-dnd");
    return mod.Draggable;
  },
  { ssr: false }
);

type DealCardsProps = {
  deals: Deal[];
};

type DealCardProps = {
  deal: Deal;
  index: number;
};

const DealCards: React.FC<DealCardsProps> = ({ deals }) => {
  return (
    <>
      {deals.map((deal, index) => (
        <DealCard key={deal.id} deal={deal} index={index} />
      ))}
    </>
  );
};

const DealCardHeader = ({ deal }: { deal: Deal }) => (
  <div className="flex flex-row m-2 mb-4 pb-4 border-b-2 border-gray-300">
    <div className="mr-2">
      <img
        src={deal.logo}
        alt={deal.title}
        height={48}
        width={48}
        className="rounded"
      />
    </div>
    <div className="flex flex-col">
      <div className="flex text-xl">{deal.title}</div>
      <span>
        <img className="inline mr-1" src={"/globe.png"} width={12} />
        <div className="inline text-sm underline underline-offset-2 decoration-[1.25px] text-black ">
          {deal.url.replace(/(^\w+:|^)\/\//, "")}
        </div>
      </span>
    </div>
  </div>
);

const DealCardRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-2 mb-2 overflow-hidden">
    <div className="text-gray-500">{label}</div>
    <div className="truncate">{children}</div>
  </div>
);

const DealCardContent = ({ deal }: { deal: Deal }) => (
  <div className="m-2 pb-4 text-sm">
    <DealCardRow label="Contacts">
      {deal.contacts.map((contact) => (
        <div>
          <img
            src={contact.avatar}
            className="w-6 mr-1 mb-1 rounded-full inline"
          />
          <div className="inline">{contact.name}</div>
        </div>
      ))}
    </DealCardRow>
    <DealCardRow label="Last Activity">
      {deal.activities.slice(-1)[0] ? deal.activities.slice(-1)[0] : "None"}
    </DealCardRow>
    <DealCardRow label="Upcoming">
      {deal.activities.slice(-1)[0] ? deal.activities.slice(-1)[0] : "None"}
    </DealCardRow>
    <DealCardRow label="Reminder">
      {deal.reminder ? deal.reminder : "None"}
    </DealCardRow>
    <DealCardRow label="Notes">
      {deal.notes.slice(-1)[0] ? deal.notes.slice(-1)[0] : "None"}
    </DealCardRow>
  </div>
);

const DealCard: React.FC<DealCardProps> = ({ deal, index }) => {
  return (
    <Draggable draggableId={deal.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`p-2 my-4 rounded bg-stone-50 ${
            snapshot.isDragging ? "opacity-70" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DealCardHeader deal={deal} />
          <DealCardContent deal={deal} />
        </div>
      )}
    </Draggable>
  );
};

export default DealCards;

import ActionButton from "./ActionButton";

export default function UnknownAction() {
  return (
    <div className="flex gap-4">
      <ActionButton>Accept</ActionButton>
      <ActionButton>Reject</ActionButton>
    </div>
  );
}

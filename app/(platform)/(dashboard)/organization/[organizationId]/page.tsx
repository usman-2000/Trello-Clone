import { db } from "@/lib/db";
import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";

const OrganizationalIdPage = () => {
  return (
    <div>
      <form action={create}>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default OrganizationalIdPage;

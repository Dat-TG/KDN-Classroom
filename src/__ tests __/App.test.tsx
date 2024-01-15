// src/__ tests __/App.test.tsx

import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ClassCodeDialog from "../components/class_details/ClassCodeDialog";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(
    <ClassCodeDialog
      classId={"test"}
      name={"test"}
      section={"test"}
      colorTheme={"test"}
      open={true}
      onClose={() => {}}
      inviteLink={"test"}
    />
  );
  expect(true).toBeTruthy();
});

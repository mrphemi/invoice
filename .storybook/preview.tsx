import { League_Spartan } from "next/font/google";

import type { Preview } from "@storybook/nextjs";

import "../src/app/globals.css";

const spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className={`${spartan.className} antialiased p-4`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

export type JoiningFormingGuideStep = {
  title: string;
  description: string;
  videoUrl: string;
};

export type JoiningFormingGuide = {
  title: string;
  description: string;
  href: string;
  steps: JoiningFormingGuideStep[];
};

export const specimenPreparationGuide: JoiningFormingGuide = {
  title: "Specimen Preparation Guide",
  description:
    "Follow the positioning, riveting, and tensile testing sequence for self-piercing riveted single-lap joints.",
  href: "/joining-forming/specimen-prep",
  steps: [
    {
      title: "Positioning",
      description:
        "Position the guide components to align the specimens throughout the self-piercing riveting process. Secure the guides, introduce and centre the rivet relative to the blank holder, then position the specimens in the guides. Controlling specimen overlap, rivet centricity, and clamping conditions promotes repeatability and joint quality.",
      videoUrl:
        "/videos/joining-forming/specimen-prep/01-specimen-positioning.mp4",
    },
    {
      title: "Joining",
      description:
        "Close the tool until the specimens contact the die, then apply blank-holder force to prevent sliding. The punch drives the rivet through the specimens and flares it within the lower substrate, forming a mechanical interlock in the die cavity. Release the tool and remove the completed joint.",
      videoUrl:
        "/videos/joining-forming/specimen-prep/02-spr-joint-formation.mp4",
    },
    {
      title: "Testing",
      description:
        "Test self-piercing riveted single-lap joints in a universal testing machine under controlled tensile load until failure. Secure the specimen with wedge clamps. As the load increases, the joint rotates slightly and the upper substrate deforms around the rivet; final failure occurs through fracture of the upper substrate.",
      videoUrl:
        "/videos/joining-forming/specimen-prep/03-tensile-testing.mp4",
    },
  ],
};

export const measurementsGuide: JoiningFormingGuide = {
  title: "Measurements Guide",
  description:
    "Prepare the specimen and electrical measurement setup, configure acquisition, and record test data.",
  href: "/joining-forming/measurements",
  steps: [
    {
      title: "Specimen Preparation and Mounting",
      description:
        "Mount and secure the specimen using the copper plate and bolt system. Tighten to the recommended torque of 10 Nm to provide consistent contact pressure. Proper clamping prevents movement and improves measurement repeatability.",
      videoUrl:
        "/videos/joining-forming/measurements/01-specimen-mounting.mp4",
    },
    {
      title: "Electrical Connections",
      description:
        "Attach the measurement leads and position electrical contacts 30 mm from the specimen edge for consistency between tests. Apply duct tape for insulation and to secure the thermocouple, helping prevent signal interference.",
      videoUrl:
        "/videos/joining-forming/measurements/02-electrical-connections.mp4",
    },
    {
      title: "Software Setup and Presets",
      description:
        "Select the thermo-electrical setup in the testing software and configure acquisition parameters, including sampling intervals, for the test requirements. The system is then ready to collect data.",
      videoUrl:
        "/videos/joining-forming/measurements/03-software-setup.mp4",
    },
    {
      title: "Test Execution and Data Recording",
      description:
        "Power on the machine and start the measurement sequence. Data is collected using the configured settings. Save the measurement file when the test is complete to maintain traceability.",
      videoUrl:
        "/videos/joining-forming/measurements/04-test-execution-and-data-recording.mp4",
    },
  ],
};
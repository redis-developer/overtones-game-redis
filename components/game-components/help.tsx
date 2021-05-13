import React from "react";
import Modal from "components/modal";
import Text from "components/text";

export const HelpModal = ({ onClose }) => (
  <Modal size="small">
    <Modal.Header title={"I need help!"} />
    <Modal.Body>
      <Text variant="subtitle">What are the numbers?</Text>
      <Text>
        The numbers refer to intervals and are used to define an intervalic
        structure of a simple interval, chord or scale.
        <br />
        For example, if you hear a minor 3rd chord which is made up of a root
        note, minor third and perfect fifth interval, you would select "1, b3,
        3".
      </Text>

      <Text variant="subtitle">What is the second play button for?</Text>
      <Text>
        Sometimes you will see a second play button. This only appears when the
        exercise does not start on the root note. For example if you are
        listening to an exercise which plays a melody starting on the 4th step,
        you will need a reference note to be able to contextualise what you're
        hearing. This is when you can press the root note button.
      </Text>

      <Text variant="subtitle">What is j7?</Text>
      <Text>
        J7 refers to "major 7". You may be familiar with maj7, ^7 or major 7 to
        describe this interval.
      </Text>

      <Text variant="subtitle">Can I use enharmonic equivalents?</Text>
      <Text>
        Yes, you can use enharmonic equivalents (i.e. "#2" instead of "b3")
        however we will give you a hint to let you knwo the "technically
        correct" way to spell what you're hearing. For example, if you have a
        minor third chord, you wouldn't use "1 #2 5" to describe it.
      </Text>
    </Modal.Body>
    <Modal.Footer
      secondaryAction={{
        onClick: onClose,
        label: "Got it",
      }}
    />
  </Modal>
);

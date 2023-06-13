import React from 'react';
import { useWizard } from '../stores/wizard_store';
import PageTemplate from './wizard_template_page';
import Constrain from './wizard_layout_constrain';
import Button from './wizard_component_button';
import RichText from './wizard_component_rich_text';
import FormItem from './wizard_component_form_item';
import WizardHtml from './wizard_html';

function Question() {
  const {
    actions, activity, answerIdx, request, getMessage,
  } = useWizard();

  if (activity.type !== 'question') {
    throw new Error('Not a question');
  }

  return (
    <PageTemplate>
      <Constrain>
        <RichText>
          <p>One more question about:</p>

          <blockquote>
            {request.query}
          </blockquote>

          <h2><WizardHtml mid={activity.titleMid} /></h2>
        </RichText>

        {activity.answers.map((answer, idx) => (
          <div key={answer.titleMid}>
            <FormItem
              type="radio"
              name="question"
              label={getMessage(answer.titleMid)}
              value={idx}
              checked={idx === answerIdx}
              onChange={() => {
                actions.selectAnswer(idx);
              }}
            />
          </div>
        ))}

        <Button
          disabled={answerIdx === null}
          onClick={actions.nextPage}
        >
          Next
        </Button>
      </Constrain>
    </PageTemplate>
  );
}

export default Question;

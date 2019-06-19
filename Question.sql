DROP TABLE IF EXISTS public.vexamine_moodle_question_answer;
DROP SEQUENCE IF EXISTS public.vexamine_moodle_question_answer_id_seq;

CREATE SEQUENCE public.vexamine_moodle_question_answer_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE TABLE IF NOT EXISTS public.vexamine_moodle_question_answer (
  id                          BIGINT NOT NULL DEFAULT nextval('vexamine_moodle_question_answer_id_seq'),
  question                    TEXT NOT NULL,
  mcq_option1                 TEXT,
  mcq_option2                 TEXT,
  mcq_option3                 TEXT,
  mcq_option4                 TEXT,
  choice_option1              TEXT,
  choice_option2              TEXT,
  answer                      TEXT,
  question_bank_id            BIGINT NULL,
  question_type               BIGINT NULL,
  create_user                 VARCHAR(200),
  update_user                 VARCHAR(200),
  create_date                 TIMESTAMP,
  update_date                 TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (question_bank_id) REFERENCES public.vexamine_moodle_question_bank (id)

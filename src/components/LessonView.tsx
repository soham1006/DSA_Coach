import type { Lesson } from "../types/lesson";

import Visualizer from "./Visualizer";
import CodeViewer from "./CodeViewer";

interface LessonViewProps {
  lesson: Lesson;
}

function LessonView({
  lesson,
}: LessonViewProps) {
  return (
    <section className="mt-10 space-y-6">

      {/* Lesson Header */}
      <div className="border-b border-zinc-800 pb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
          Generated Lesson
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {lesson.title}
        </h2>
      </div>


      {/* Problem */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">

        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-semibold">
            01
          </span>

          <h3 className="text-lg font-semibold">
            Problem
          </h3>
        </div>

        <p className="mt-4 max-w-4xl text-sm leading-7 text-zinc-400 sm:text-base">
          {lesson.problem.statement}
        </p>

        {lesson.problem.constraints.length > 0 && (
          <div className="mt-6">

            <h4 className="text-sm font-medium text-zinc-300">
              Constraints
            </h4>

            <ul className="mt-3 space-y-2">
              {lesson.problem.constraints.map(
                (constraint, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-zinc-500"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />

                    <span>
                      {constraint}
                    </span>
                  </li>
                )
              )}
            </ul>

          </div>
        )}
      </section>


      {/* Examples */}
      {lesson.problem.examples.length > 0 && (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-semibold">
              02
            </span>

            <h3 className="text-lg font-semibold">
              Examples
            </h3>
          </div>

          <div className="mt-5 space-y-4">

            {lesson.problem.examples.map(
              (example, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5"
                >

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                        Input
                      </p>

                      <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-sm leading-6 text-zinc-300">
                        {example.input}
                      </pre>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                        Output
                      </p>

                      <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-sm leading-6 text-zinc-300">
                        {example.output}
                      </pre>
                    </div>

                  </div>

                  <div className="mt-5 border-t border-zinc-800 pt-4">

                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                      Explanation
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {example.explanation}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>
        </section>
      )}


      {/* Approaches */}
      {lesson.approaches.length > 0 && (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-semibold">
              03
            </span>

            <h3 className="text-lg font-semibold">
              Approaches
            </h3>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            {lesson.approaches.map(
              (approach, index) => (
                <div
                  key={index}
                  className={`rounded-xl border p-5 ${
                    approach.recommended
                      ? "border-zinc-600 bg-zinc-800/70"
                      : "border-zinc-800 bg-zinc-950"
                  }`}
                >

                  <div className="flex items-start justify-between gap-3">

                    <h4 className="font-medium text-zinc-200">
                      {approach.name}
                    </h4>

                    {approach.recommended && (
                      <span className="shrink-0 rounded-full border border-zinc-600 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-300">
                        Recommended
                      </span>
                    )}

                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {approach.idea}
                  </p>

                  <div className="mt-5 flex gap-6 border-t border-zinc-800 pt-4 text-xs">

                    <div>
                      <p className="text-zinc-600">
                        Time
                      </p>

                      <p className="mt-1 font-medium text-zinc-300">
                        {approach.time}
                      </p>
                    </div>

                    <div>
                      <p className="text-zinc-600">
                        Space
                      </p>

                      <p className="mt-1 font-medium text-zinc-300">
                        {approach.space}
                      </p>
                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        </section>
      )}


      {/* Visualization */}
      <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">

        <div className="border-b border-zinc-800 px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-semibold">
              04
            </span>

            <div>
              <h3 className="text-lg font-semibold">
                Visualization
              </h3>

              <p className="mt-0.5 text-xs text-zinc-600">
                See how the algorithm changes state.
              </p>
            </div>
          </div>

        </div>

        <div className="min-h-56 p-4 sm:p-6">
          <Visualizer
            visualization={
              lesson.visualization
            }
          />
        </div>

      </section>


      {/* Steps */}
      {lesson.steps.length > 0 && (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-semibold">
              05
            </span>

            <div>
              <h3 className="text-lg font-semibold">
                Step-by-Step Explanation
              </h3>

              <p className="mt-0.5 text-xs text-zinc-600">
                Follow the execution one step at a time.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">

            {lesson.steps.map(
              (step, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5"
                >

                  <div className="flex gap-4">

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400">
                      {index + 1}
                    </span>

                    <div className="min-w-0">

                      <h4 className="font-medium text-zinc-200">
                        {step.title}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {step.explanation}
                      </p>

                      <p className="mt-3 text-xs text-zinc-700">
                        Code line: {step.codeLine}
                      </p>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        </section>
      )}


      {/* Code */}
      <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">

        <div className="border-b border-zinc-800 px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-semibold">
              06
            </span>

            <div>
              <h3 className="text-lg font-semibold">
                Code
              </h3>

              <p className="mt-0.5 text-xs text-zinc-600">
                {lesson.language.toUpperCase()}
              </p>
            </div>
          </div>

        </div>

        <div className="p-4 sm:p-6">
          <CodeViewer
            code={lesson.code}
          />
        </div>

      </section>

    </section>
  );
}

export default LessonView;
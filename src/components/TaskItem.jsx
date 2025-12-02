import { useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PencilIcon } from "~/icons/PencilIcon";
import { CheckIcon } from "~/icons/CheckIcon";
import { updateTask } from "~/store/task";
import "./TaskItem.css";
import { useMemo } from "react";

export const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const { listId } = useParams();
  const { id, title, detail, limit, done } = task;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = useCallback(() => {
    setIsSubmitting(true);
    void dispatch(updateTask({ id, done: !done })).finally(() => {
      setIsSubmitting(false);
    });
  }, [id, done]);

  const leftLimitDays = useMemo(() => {
    if (!limit) {
      return null;
    }
    return Math.floor(
      (new Date(limit).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
  }, [limit]);

  return (
    <div className="task_item">
      <div className="task_item__title_container">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isSubmitting}
          className="task__item__mark_button"
        >
          {done ? (
            <div className="task_item__mark____complete" aria-label="Completed">
              <CheckIcon className="task_item__mark____complete_check" />
            </div>
          ) : (
            <div
              className="task_item__mark____incomplete"
              aria-label="Incomplete"
            ></div>
          )}
        </button>
        <div className="task_item__title" data-done={done}>
          {title}
        </div>
        <div aria-hidden className="task_item__title_spacer"></div>
        <Link
          to={`/lists/${listId}/tasks/${id}`}
          className="task_item__title_action"
        >
          <PencilIcon aria-label="Edit" />
        </Link>
      </div>
      <div className="task_item__detail">{detail}</div>
      {limit && (
        <>
          <div className="task_item__limit">
            Due:{" "}
            {new Date(limit).toLocaleString(undefined, {
              timeZone: "Asia/Tokyo",
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div
            className={`task_item__limit task_item__limit_left ${leftLimitDays < 0 ? "task_item__limit_left_overdue" : ""}`}
          >
            {leftLimitDays >= 0 ? `Due in ${leftLimitDays} days` : "Overdue"}
          </div>
        </>
      )}
    </div>
  );
};

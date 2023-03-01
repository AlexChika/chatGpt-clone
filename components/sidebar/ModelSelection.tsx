import useSWR from "swr";
import fetcher from "../../lib/api/fetcher";
import Select from "react-select";

const ModelSelection = () => {
  const { data: models, error, isLoading } = useSWR("/api/getEngines", fetcher);

  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        menuPosition="fixed"
        isSearchable={true}
        isLoading={true}
        onChange={(e) => setModel(e.value)}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: "#434654",
            background: "#434654",
          }),
        }}
      />
    </div>
  );
};

export default ModelSelection;

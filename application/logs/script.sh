#!/bin/bash
while IFS='' read -r line || [[ -n "$line" ]]; do
    ((entries++))
    if [[ $line == *"success"* ]]; then
      premium=${line##*=}  # retain the part after the last slash
      premium=${premium%.*}
      total=$(($total + $premium))
      ((sucessful++))
    fi
    if [[ $line == *"failure"* ]]; then
      ((failure++))
    fi
done < "$1"

echo "Total Quote Submissions : $entries"
echo "Total Successful Quote Submissions : $sucessful"
echo "Total failed Quote Submissions : $failure"
average=$(($total / $sucessful))
echo "Average premium of successful quotes : $ $average" 
